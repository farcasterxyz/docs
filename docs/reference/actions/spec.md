# Actions Specification

Actions let developers create custom buttons which users can install into their action bar on any Farcaster application.

Like [Frames](../frames/spec.md), actions are an open standard for extending casts with new kinds of interactions. Actions and frames are composable, enabling developers to create interactive, authenticated applications that work across Farcaster clients.

Developers have used actions to add features like translation, moderation tools, and tipping to Farcaster clients.

## Defining actions

An action is a web API that lives at a URL on a web server. We'll refer to this web server as the "action server."

The action server must define two routes:

- A GET route that returns metadata about the action
- A POST route to handle action requests

### Action metadata

Action servers must respond to an HTTP GET requests to their metadata URL with a 200 OK and a JSON body in the following format:

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

#### Properties

| Key              | Description                                                                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`           | An action name, which may be up to 30 characters.                                                                                                                           |
| `icon`           | An action icon ID. See [Valid Icons](#valid-icons) for a list of supported icons.                                                                                           |
| `description`    | A short description up to 80 characters.                                                                                                                                    |
| `aboutUrl`       | Optional external link to an "about" page. Only include this if you can't fully describe your action using the description field. Must be `http://` or `https://` protocol. |
| `action.type`    | Action type. Must be `'post'`.                                                                                                                                              |
| `action.postUrl` | Optional action handler URL. If not provided, clients will POST to the same URL as the action metadata route.                                                               |

### Action handler

When a user clicks a cast action button in the feed, clients make a POST request to the action handler with a signed message. Actions use the same [Frame signature message](../frames/spec.md#frame-signature-packet) format as Farcaster frames.

In this message:

- The `frame_url` is set to the cast action `postUrl`.
- The `button_index` is set to `1`.
- The `cast_id` is the id of the cast from which the user initiated the action.

Action servers may respond with either a short message, a frame URL, or an error.

#### Message response type

The message response type displays a short message and optional external link. It's suitable for simple single step interactions.

An action server may return 200 OK and a JSON body in the following format to display a message:

```json
{
  "type": "message",
  "message": "Reminder saved!",
  "link": "https://remindbot.example.com/reminders/1"
}
```

**Properties**
| Key | Description |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type` | Must be `message`. |
| `message` | A short message, less than 80 characters. |
| `link` | An optional URL. Must be `http://` or `https://` protocol. If present, clients must display the message as an external link to this URL. |

#### Frame response type

The frame response type allows cast actions to display a [Frame](../frames/spec.md). It's useful for complex multi-step interactions.

An action server may return 200 OK and a JSON body in the following format to display a frame:

```json
{
  "type": "frame",
  "frameUrl": "https://remindbot.example.com/frame"
}
```

**Properties**
| Key | Description |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type` | Must be `frame`. |
| `frameUrl` | URL of the frame to display. Clients must show the frame in a special context, like a modal or bottom sheet. |

#### Error response type

An action server may return a 4xx response with a message to display an error:

```json
{
  "message": "Something went wrong."
}
```

**Properties**
| Key | Description |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `message` | A short error message, less than 80 characters. |

## Adding actions

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
