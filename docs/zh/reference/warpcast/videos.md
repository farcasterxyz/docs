# 如何在 Warpcast 上展示你的视频

1. 确保将视频以可流式传输的 `.m3u8` 文件格式提供。这能确保客户端在观看时仅下载所需内容，提供高性能的观看体验。

2. 确保 `.m3u8` 清单文件暴露视频的分辨率信息。Warpcast 会使用这些信息来确定渲染时的正确宽高比。包含分辨率数据的清单文件示例如下：

```
#EXTM3U
#EXT-X-VERSION:3

#EXT-X-STREAM-INF:BANDWIDTH=2444200,CODECS="avc1.64001f,mp4a.40.2",RESOLUTION=474x842
480p/video.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=4747600,CODECS="avc1.640020,mp4a.40.2",RESOLUTION=720x1280
720p/video.m3u8
```

3. 确保在发布 cast 时 `.m3u8` 文件是可访问的。Warpcast 会检查一次，如果没有有效数据，cast 将不会显示视频。

4. 当 URL 从以 `/my-video.m3u8` 结尾改为 `/thumbnail.jpg` 时，提供一个预览/缩略图，以便在用户与视频交互前显示。

5. 联系 Warpcast 团队，申请为你的域名启用视频功能。告诉我们你的视频 URL 格式，我们将配置爬虫程序以在信息流中正确显示它们。请注意，在申请加入白名单前，请确保已完成上述所有步骤。[在 Warpcast 上联系 @gt](https://warpcast.com/~/inbox/create/302?text=Completed%20video%20setup)。
