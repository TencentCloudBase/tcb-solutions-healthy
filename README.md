# 云开发 - 疫情期间 - 健康上报解决方案

## 项目展示

![](https://postimg.aliavv.com/mbp/22gqk.png)

## 特性

1. 在小程序端完成每日健康信息上报
2. 在小程序端完成员工返程信息登记

## 项目 依赖

- 腾讯云 · 云开发

## 如何部署？

1. Clone 项目到本地
2. 修改 `project.config.json` 中的 appid 替换为你自己的 appid
3. 使用微信开发者工具，导入项目
4. 创建云数据库集合 `GOBACKINFO` 和 `checkin` (数据库集合权限为“仅创建者可读写”）
5. 开始使用

## 数据集合
数据库字典参考：https://github.com/TencentCloudBase/tcb-solutions-healthy/wiki/DB

## Bug 反馈

Bug 信息请通过 [issue](https://github.com/TencentCloudBase/tcb-solutions-healthy/issues/new) 进行反馈

## LICENSE

Apache LICENSE
