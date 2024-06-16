# Actions Specification

Actions let developers create custom buttons which users can install into their action bar on any Farcaster application. Think browser extensions, but for casts.

Like [Frames](../frames/spec.md), actions are an open standard for extending casts with new kinds of interactions. Actions and frames are composable, enabling developers to create interactive, authenticated applications that work across Farcaster clients.

So far, developers have used actions to add features like translation, moderation tools, and tipping to Farcaster clients.

## Defining actions

An action is a web API that lives at a URL on a web server. We'll refer to this web server as the "action server."

The action server must define two routes:

- A GET route that returns metadata about the action
- A POST route to handle action requests

Farcaster clients load the GET route to get information about the action, and make requests to the POST route when users click the action button in feed.

## Metadata route

Action servers must respond to an HTTP GET request to their metadata URL with a 200 OK and a JSON body in the following format:

```json
{
  "name": "Remind me in 10 days",
  "icon": "lightbulb",
  "description": "Get an automatic reminder from @remindbot in 10 days.",
  "aboutUrl": "https://remindbot.example.com/remind/about",
  "action": {
    "type": "post",
    "postUrl": "https://remindbot.example.com/actions/remind"
  }
}
```

### Properties

| Key              | Description                                                                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`           | An action name, which may be up to 30 characters.                                                                                                                           |
| `icon`           | An action icon ID. See [Valid Icons](#valid-icons) for a list of supported icons.                                                                                           |
| `description`    | A short description up to 80 characters.                                                                                                                                    |
| `aboutUrl`       | Optional external link to an "about" page. Only include this if you can't fully describe your action using the description field. Must be `http://` or `https://` protocol. |
| `action.type`    | Action type. Must be `'post'`.                                                                                                                                              |
| `action.postUrl` | Optional action handler URL. If not provided, clients will POST to the same URL as the action metadata route.                                                               |

## Handler route

When a user clicks a cast action button in the feed, clients make a POST request to the action handler with a signed message. Actions use the same [Frame signature message](../frames/spec.md#frame-signature-packet) format as Farcaster frames.

In this message:

- The `frame_url` is set to the cast action `postUrl`.
- The `button_index` is set to `1`.
- The `cast_id` is the id of the cast from which the user initiated the action.

Action servers may respond with either a short message, a frame URL, or an error.

### Message response type

The message response type displays a short message and optional external link. It's suitable for simple single step interactions.

![Message actions](/assets/actions/message_type.png)

An action server may return 200 OK and a JSON body in the following format to display a message:

```json
{
  "type": "message",
  "message": "Reminder saved!",
  "link": "https://remindbot.example.com/reminders/1"
}
```

**Properties**

| Key       | Description                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `type`    | Must be `message`.                                                                                                                       |
| `message` | A short message, less than 80 characters.                                                                                                |
| `link`    | An optional URL. Must be `http://` or `https://` protocol. If present, clients must display the message as an external link to this URL. |

### Frame response type

The frame response type allows cast actions to display a [Frame](../frames/spec.md). It's useful for complex multi-step interactions.

![Frame actions](/assets/actions/frame_type.png)

An action server may return 200 OK and a JSON body in the following format to display a frame:

```json
{
  "type": "frame",
  "frameUrl": "https://remindbot.example.com/frame"
}
```

**Properties**

| Key        | Description                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| `type`     | Must be `frame`.                                                                                             |
| `frameUrl` | URL of the frame to display. Clients must show the frame in a special context, like a modal or bottom sheet. |

### Error response type

An action server may return a 4xx response with a message to display an error:

```json
{
  "message": "Something went wrong."
}
```

**Properties**

| Key       | Description                                     |
| --------- | ----------------------------------------------- |
| `message` | A short error message, less than 80 characters. |

## Client implementation

### Adding actions

Clients must allow users to enable cast actions by clicking a deep link URL. For example, in Warpcast:

```
https://warpcast.com/~/add-cast-action?url=https%3A%2F%2Fremindbot.example.com%2Fremind
```

When a user enables a cast action, clients must:

- Load the URL and parse its query parameters for the action metadata route.
- GET the action metadata URL to retrieve action metadata.
- Validate and sanitize all data
- Save the discovered action on behalf of the user.
- Update metadata for existing saved actions.
- Allow the user to remove unwanted or unused actions.

Clients should show a confirmation screen which gives the user more context about what the action does. This screen should warn the user if installing this action will replace a previous action.

### Displaying actions

Clients must display actions alongside casts and allow the user to click/tap to interact.

#### Handling clicks

When the user clicks an action, the client must make a POST request to the action’s `postUrl` with a signed frame message.

In this message, clients must:

- Set `frame_url` to the cast action `postUrl`.
- Set `button_index` to `1`.
- Set `cast_id` to the id of the cast from which the user initiated the action.
- Otherwise, follow the existing format for Frame messages.

#### Displaying responses

The action server may send a short text response, a frame, or an error back to clients.

When a client receives an action response, it must:

1. Validate the response format:
   - Type frame:
     - must include `frameUrl`
     - `frameUrl` must begin with `https://`
   - Type message:
     - must include a `message` string < 80 characters
2. If the response is type message or error, display it.
3. If the response is type frame, POST a Frame message to the returned `frameUrl`:
   - Set `buttonIndex` to 1
   - Set `castId` in the Frame message body to the ID of the cast that was clicked
4. Parse the response as a Frame and display it in a special context, like a bottom sheet or modal

Clients must allow the user to close the Frame once interaction is completed.

## Reference

#### Valid Icons

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
