# 操作规范（Actions Specification）

操作（Actions）允许开发者在任何 Farcaster 应用中创建自定义按钮，供用户安装到操作栏中。可以将其理解为浏览器扩展，但专用于 Casts。

与 [Frames](/developers/frames/spec) 类似，操作是一个开放标准，用于通过新型交互扩展 Casts 功能。操作和帧（Frames）可组合使用，使开发者能够创建跨 Farcaster 客户端工作的交互式认证应用。

目前，开发者已使用操作为 Farcaster 客户端添加了翻译、内容审核工具和小费等功能。

## 定义操作

操作是一个位于 Web 服务器 URL 上的 Web API。我们将此 Web 服务器称为"操作服务器"。

操作服务器必须定义两个路由：

- 一个 GET 路由，返回操作的元数据
- 一个 POST 路由，用于处理操作请求

Farcaster 客户端加载 GET 路由以获取操作信息，并在用户点击信息流中的操作按钮时向 POST 路由发出请求。

## 元数据路由

操作服务器必须响应其元数据 URL 的 HTTP GET 请求，返回 200 OK 状态码和以下格式的 JSON 正文：

```json
{
  "name": "10天后提醒我",
  "icon": "lightbulb",
  "description": "10天后从@remindbot获取自动提醒。",
  "aboutUrl": "https://remindbot.example.com/remind/about",
  "action": {
    "type": "post",
    "postUrl": "https://remindbot.example.com/actions/remind"
  }
}
```

### 属性

| 键名             | 描述                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| `name`           | 操作名称，最多 30 个字符。                                                                                    |
| `icon`           | 操作图标 ID。支持的图标列表参见[有效图标](#valid-icons)。                                                     |
| `description`    | 简短描述，最多 80 个字符。                                                                                    |
| `aboutUrl`       | 可选的"关于"页面外部链接。仅当无法通过描述字段完整说明操作功能时包含此项。必须使用`http://`或`https://`协议。 |
| `action.type`    | 操作类型。必须为`'post'`。                                                                                    |
| `action.postUrl` | 可选的操作处理程序 URL。如果未提供，客户端将向操作元数据路由的相同 URL 发送 POST 请求。                       |

## 处理程序路由

当用户点击信息流中的 Cast 操作按钮时，客户端会向操作处理程序发送带有签名消息的 POST 请求。操作使用与 Farcaster 帧相同的[帧签名消息](/developers/frames/spec#frame-signature-packet)格式。

在此消息中：

- `frame_url`设置为 Cast 操作的`postUrl`
- `button_index`设置为`1`
- `cast_id`是用户发起操作的 Cast 的 ID

操作服务器可以返回简短消息、帧 URL 或错误。

### 消息响应类型

消息响应类型显示简短消息和可选的外部链接。适用于简单的单步交互。

![消息操作](/assets/actions/message_type.png)

操作服务器可返回 200 OK 状态码和以下格式的 JSON 正文来显示消息：

```json
{
  "type": "message",
  "message": "提醒已保存！",
  "link": "https://remindbot.example.com/reminders/1"
}
```

**属性**

| 键名      | 描述                                                                                                 |
| --------- | ---------------------------------------------------------------------------------------------------- |
| `type`    | 必须为`message`。                                                                                    |
| `message` | 简短消息，少于 80 个字符。                                                                           |
| `link`    | 可选 URL。必须使用`http://`或`https://`协议。如果存在，客户端必须将消息显示为指向此 URL 的外部链接。 |

### 帧响应类型

帧响应类型允许 Cast 操作显示[帧](/developers/frames/spec)。适用于复杂的多步交互。

![帧操作](/assets/actions/frame_type.png)

操作服务器可返回 200 OK 状态码和以下格式的 JSON 正文来显示帧：

```json
{
  "type": "frame",
  "frameUrl": "https://remindbot.example.com/frame"
}
```

**属性**

| 键名       | 描述                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------- |
| `type`     | 必须为`frame`。                                                                          |
| `frameUrl` | 要显示的帧 URL。256 字节字符串。客户端必须在特殊上下文（如模态框或底部表单）中显示该帧。 |

### 错误响应类型

操作服务器可返回 4xx 响应和消息来显示错误：

```json
{
  "message": "出错了。"
}
```

**属性**

| 键名      | 描述                           |
| --------- | ------------------------------ |
| `message` | 简短错误消息，少于 80 个字符。 |

## 客户端实现

### 添加操作

客户端必须允许用户通过点击深层链接 URL 来启用 Cast 操作。例如在 Warpcast 中：

```
https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Fremindbot.example.com%2Fremind
```

当用户启用 Cast 操作时，客户端必须：

1. 加载 URL 并解析其查询参数以获取操作元数据路由
2. GET 操作元数据 URL 以检索操作元数据
3. 验证并清理所有数据
4. 代表用户保存发现的操作
5. 更新现有已保存操作的元数据
6. 允许用户移除不需要或未使用的操作

客户端应显示确认屏幕，向用户提供有关操作功能的更多上下文。如果安装此操作将替换先前的操作，此屏幕应警告用户。

### 显示操作

客户端必须在 Cast 旁边显示操作，并允许用户点击/轻触进行交互。

#### 处理点击

当用户点击操作时，客户端必须向操作的`postUrl`发送带有签名帧消息的 POST 请求。

在此消息中，客户端必须：

- 将`frame_url`设置为 Cast 操作的`postUrl`
- 将`button_index`设置为`1`
- 将`cast_id`设置为用户发起操作的 Cast 的 ID
- 其他方面遵循现有的帧消息格式

#### 显示响应

操作服务器可能向客户端发送简短文本响应、帧或错误。

当客户端收到操作响应时，必须：

1. 验证响应格式：
   - 帧类型：
     - 必须包含`frameUrl`
     - `frameUrl`必须以`https://`开头
   - 消息类型：
     - 必须包含小于 80 个字符的`message`字符串
2. 如果响应是消息或错误类型，则显示它
3. 如果响应是帧类型，则向返回的`frameUrl`发送帧消息 POST 请求：
   - 将`buttonIndex`设置为 1
   - 在帧消息正文中将`castId`设置为被点击 Cast 的 ID
4. 将响应解析为帧并在特殊上下文（如底部表单或模态框）中显示

客户端必须允许用户在交互完成后关闭帧。

## 参考

#### 有效图标

- number
- search
- image
- alert
- code
- meter
- ruby
- video
- filter
- stop
- plus
- info
- check
- book
- question
- mail
- home
- star
- inbox
- lock
- eye
- heart
- unlock
- play
- tag
- calendar
- database
- hourglass
- key
- gift
- sync
- archive
- bell
- bookmark
- briefcase
- bug
- clock
- credit-card
- globe
- infinity
- light-bulb
- location
- megaphone
- moon
- note
- pencil
- pin
- quote
- reply
- rocket
- shield
- stopwatch
- tools
- trash
- comment
- gear
- file
- hash
- square
- sun
- zap
- sign-out
- sign-in
- paste
- mortar-board
- history
- plug
- bell-slash
- diamond
- id-badge
- person
- smiley
- pulse
- beaker
- flame
- people
- person-add
- broadcast
- graph
- shield-check
- shield-lock
- telescope
- webhook
- accessibility
- report
- verified
- blocked
- bookmark-slash
- checklist
- circle-slash
- cross-reference
- dependabot
- device-camera
- device-camera-video
- device-desktop
- device-mobile
- dot
- eye-closed
- iterations
- key-asterisk
- law
- link-external
- list-ordered
- list-unordered
- log
- mention
- milestone
- mute
- no-entry
- north-star
- organization
- paintbrush
- paper-airplane
- project
- shield-x
- skip
- squirrel
- stack
- tasklist
- thumbsdown
- thumbsup
- typography
- unmute
- workflow
- versions
