# 云开发 - 疫情期间 - 健康上报解决方案

## 如何部署？

1. Clone 项目到本地
2. 修改 `project.config.json` 中的 appid 替换为你自己的 appid
3. 使用微信开发者工具，导入项目
4. 创建云数据库集合 `GOBACKINFO` 和 `checkin`
5. 开始使用

## 数据集合
### EPIDEMICINFO 返程信息登记表
| 字段编码        | 字段名称   |  数据字典  |
| --------   | :-----:  | :----:  |
| name     | 姓名 |        |
| place     | 工作地点：/所在校区 |        |
| date     | 返程时间 |        |
| gobackwhere     | 何处返程 |        |
| wentprovinces     | 假期你所去过的省市 |        |
| traffic     | 返程所乘交通工具 |    0-铁路 1-飞机 2-客运 3-自驾 4-渡轮    |
| trainnumber     | 返程所乘车次/航班 |        |
| bodystatusinfo     | 目前有无咳嗽，发热等症状 |        |
| otherManBodyInfo     | 同行人员/亲戚/近期接触人员中有无 咳嗽，发热等症状/确诊患者 |        |
| remark     | 其他备注信息 |        |
| goHBFlag     | 目前是否在湖北省内 |    0-是 1-否    |
| workPlaceFlag     | 目前是否在工作地/校内 |   0-是 1-否     |
| withIllTakeFlag     | 过去14天是否与确诊病例乘过同一交通工具 |     0-是 1-否   |
| contractillFlag     | 过去14天是否密切接触过各地确诊病例或定点医院医务人员 |    0-是 1-否    |
| bodyStatusFlag     | 过去14天是否有身体不适 |    0-是 1-否    |
| goHareasHaveFlagBFlag     | 目前居住小区是否有确诊病例 |    0-是 1-否    |






## LICENSE

Apache LICENSE
