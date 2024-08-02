# HimRemake 开发数据包

原项目地址：[HimRemake](https://himremake.zyfdroid.com)

## 使用方法

本体数据包：

创建一个 `assetpath.txt`，内容为原项目的assets文件夹所在路径，例如 `Q:\Projects\Android\HimRemake\app\src\main\assets`

使用 RoslynPad 或者 dotnet-script 运行 AssetPacker.csx，更新项目的资源文件。

如果经常使用，可以使用 dotnet-script publish 将AssetPacker.csx打包为可执行程序

更新：

将文件夹内所有内容打包成zip，后缀改为 `.hrdpkg`
