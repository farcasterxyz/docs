# How to have your video displayed on the Farcaster client

1. Ensure you serve your video as a streamable `.m3u8` file. This ensures clients only download what they need when viewing, and nothing more, providing a high performance experience.

2. Make sure that `.m3u8` manifest exposes the resolution(s) for your video. The Farcaster client uses this to determine the correct aspect ratio when rendering. A manifest file with resolution data looks something like:

```
#EXTM3U
#EXT-X-VERSION:3

#EXT-X-STREAM-INF:BANDWIDTH=2444200,CODECS="avc1.64001f,mp4a.40.2",RESOLUTION=474x842
480p/video.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=4747600,CODECS="avc1.640020,mp4a.40.2",RESOLUTION=720x1280
720p/video.m3u8
```

3. Ensure that at cast publish time the `.m3u8` file is available. The Farcaster client checks once and if there is no valid data, the cast will show no video.

4. Have the same URL when changed from ending in `/my-video.m3u8` to `/thumbnail.jpg` with a preview/thumbnail image to render before the user has interacted with the video.

5. Reach out to the Farcaster team and ask for us to enable videos for your domain. Tell us the format of your video URLs and we’ll configure our scrapers to display them correctly in the feed. Please make sure to complete all these steps above before reaching out for allowlisting. [Ping @gt on Farcaster](https://farcaster.xyz/~/inbox/create/302?text=Completed%20video%20setup).
