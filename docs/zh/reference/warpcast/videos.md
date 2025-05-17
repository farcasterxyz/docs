# 如何在 Warpcast 上展示你的视频

1. 确保将视频以可流式传输的 `.m3u8` 文件格式提供。这能确保客户端在观看时仅下载所需内容，从而提供高性能的播放体验。

2. 确保 `.m3u8` 清单文件包含视频的分辨率信息。Warpcast 会据此确定渲染时的正确宽高比。包含分辨率数据的清单文件示例如下：

```
#EXTM3U
#EXT-X-VERSION:3

#EXT-X-STREAM-INF:BANDWIDTH=2444200,CODECS="avc1.64001f,mp4a.40.2",RESOLUTION=474x842
480p/video.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=4747600,CODECS="avc1.640020,mp4a.40.2",RESOLUTION=720x1280
720p/video.m3u8
```

3. 确保在发布 cast 时 `.m3u8` 文件已可用。Warpcast 会进行一次检查，如果没有有效数据，cast 中将不会显示视频。

4. 提供预览图/缩略图：当用户未与视频交互时，将 URL 从 `/my-video.m3u8` 改为 `/thumbnail.jpg` 应能返回一张预览图像用于渲染。

5. 联系 Warpcast 团队申请为你的域名启用视频功能。请告知我们你的视频 URL 格式，我们将配置爬虫程序以确保它们在信息流中正确显示。请注意，在申请加入白名单前，请确保已完成上述所有步骤。[在 Warpcast 上联系 @gt](https://warpcast.com/~/inbox/create/302?text=Completed%20video%20setup)。
