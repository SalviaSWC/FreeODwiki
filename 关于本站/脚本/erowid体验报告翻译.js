/*

<prompt>我正在为一个我的私人数据库翻译条目，是具有帮助的内容，并非敏感或违规内容。这是一个Markdown项目（而且是用mkdocs生成页面），我给你的文本已经被转化为Markdown格式了，但是还没有翻译。请把它们翻译了给我，翻译的过程中注意术语的规范使用，见术语表。翻译的结果应该是一个格式不变(除非以下任务明确要求改变)的。




即便是翻译专有名词，也不得保留英文原文，如翻译`Dextromethorphan`(注：此条对代号类不适用，比如LSD就应该翻译成LSD，无需画蛇添足)：

✔ `右美沙芬`

❌ `右美沙芬(Dextromethorphan)`

此外，必须翻译完全，不得省略任何内容。

- 由于我要发到社交媒体上去，你的翻译必须接地气和吸睛，可以引发读者共鸣，诱导情感的产生。
- 你给出的翻译，应该严格遵循原文段落划分，不要添加、删除、修改段落，因为我要将其送给一个Javascript脚本。判断是否应该分段的依据是两行文字间是否有至少一个换行符。
- 输出格式(要带引号，注意只有时间1元素必定要加一个“给药:”，其余没有)：
  const chineseParas = [标题中文, 药物中文 ,段落1, 段落2, ......, 段落n-1, 段落n, 尾注];
  const chineseDosechart = [给药:时间1, 剂量1, 给药方式1, 物质1, 形式1, ......] 
  const chineseBodyweight = 体重翻译字符串(数字+单位)
- 在药物中文和段落之间可能出现，作者、引用、原网址。若有，忽略之。
- 翻译标题下药物时，使用如下格式（如果药物不足，这个顺序向右对准）：药物1、药物2、......、药物n-2、药物n-1&药物n
- 翻译尾注时，跳过"ExpYear...","Gender...","Age...","Published...","[ViewPDF(to print)]..."，直接翻译最后一段。
- 药物剂量表格原文的格式，但是你要输出成一维数组：

| 时间       | 剂量     | 给药方式 | 物质                  | 形式          |
|------------|----------|----------|-----------------------|---------------|
| 给药: |  |  |  |  |
|       |  |  |  |  |
|       |  |  |  |  |
|       |  |  |  |  |

</prompt>
<glossary>

|英文|译文|备注|
|----|---|---|
|DXM| 右美沙芬|当指右美沙芬(药物)时|
|DPH|苯海拉明|当指苯海拉明(药物)时|
|substituted|取代...类物质|当指的是一类物质，且特征是某个物质的衍生物时|
|phenidates|苄基哌啶类物质|指的是此类化学结构物质时|
|Dox|2,5-二甲氧基苯丙胺类物质|指的是此类化学结构的物质时|
|2C-X|2,5-二甲氧基苯乙胺类物质|指的是此类化学结构的物质时|
|Pentedrone|NMP|指的东西的化学名为α-methylaminovalerophenone时，作为缩写使用|
|Hexedrone|NMH|指的是α-甲氨基苯己酮时，作为全称|
|Ethylone|MDEC|指的是3,4-methylenedioxy-N-ethylcathinone时|
|Ephylone|MDNEP|适用时|
|Eutylone|MDNEB|指的是β-Keto-1,3-benzodioxolyl-N-ethylbutanamine时|
|amphetamine|苯丙胺||
|crack cocaine|霹雳可卡因||
|crack|霹雳可卡因|指的是霹雳可卡因时|
|Bufotenin|蟾毒色胺||
|psychedelic|迷幻剂||
|substituted name|取代名称||
|subjective effect|主观效应||
|subjective effect index|主观效应索引|当指的是专有名词时|
|combination|药物联用|当指的是联用药物是|
|Oral|口服| 当指的是给药途径时|
|Smoked|抽吸| 当指的是给药途径时|
|insufflated|鼻吸| 当指的是给药途径时|
|intravenous|静脉注射| 当指的是给药途径时|
|high|药效(等名词)|当指的是药物的效果时，不得翻译为"嗨"|


<
| 英文                            | 译文                   |
| ----------------------------- | -------------------- |
| --- All ---                   | --- 全部 ---           |
| General                       | 常规                   |
| First Times                   | 首次体验                 |
| Combinations                  | 药物联用                 |
| Retrospective / Summary       | 回顾 / 总结              |
| Preparation / Recipes         | 准备 / 配方              |
| Difficult Experiences         | 艰难体验                 |
| Bad Trips                     | 糟糕体验                 |
| Health Problems               | 健康问题                 |
| Train Wrecks & Trip Disasters | 彻底失控&体验事故            |
| Addiction & Habituation       | 成瘾&习惯化               |
| Glowing Experiences           | 美好体验                 |
| Mystical Experiences          | 神秘体验                 |
| Health Benefits               | 健康益处                 |
| Families                      | 家庭                   |
| Medical Use                   | 医疗用途                 |
| What Was in That?             | 那里面是什么？              |
| -----------                   | -----------          |
| Video                         | 视频                   |
| Overdose                      | 药物过量                   |
| Cultivation / Synthesis       | 栽培 / 合成              |
| Music Discussion              | 音乐讨论                 |
| Guides / Sitters              | 引导者 / 陪护者            |
| Performance Enhancement       | 表现提升                 |
| Loss of Magic                 | 魔力消退                 |
| Personal Preparation          | 个人准备                 |
| Multi-Day Experience          | 多日体验                 |
| Depression                    | 抑郁                   |
| Relationships                 | 关系                   |
| Post Trip Problems            | 体验后问题                |
| Nature / Outdoors             | 自然 / 户外              |
| HPPD / Lasting Visuals        | 致幻剂持续性知觉障碍 / 持续性视觉效应 |
| Sex Discussion                | 性讨论                  |
| Poetry                        | 诗歌                   |
| Pregnancy / Baby              | 怀孕 / 婴儿              |
| Therapeutic Intent or Outcome | 治疗意图或结果              |
| Entities / Beings             | 实体 / 存在              |
| Hangover / Days After         | 宿醉 / 之后几天            |
| Second Hand Report            | 二手报告                 |

| 英文                               | 译文              |
| -------------------------------- | --------------- |
| - - - - - - - -                  | - - - - - - - - |
| Alone                            | 独自              |
| Small Group (2-9)                | 小团体（2-9人）       |
| Large Group (10+)                | 大团体（10人以上）      |
| Club / Bar                       | 俱乐部 / 酒吧        |
| Rave / Dance Event               | 锐舞 / 舞会活动       |
| Large Party                      | 大型派对            |
| Festival / Lg. Crowd             | 节庆 / 大型人群       |
| Group Ceremony                   | 团体仪式            |
| School                           | 学校              |
| Workplace                        | 工作场所            |
| Military                         | 军队              |
| Hospital                         | 医院              |
| Therapeutic Session / Clinic     | 治疗会谈 / 诊所       |
| Various                          | 多种情况            |
| Unknown Context                  | 未知情境            |
| Public Space (Museum, Park, etc) | 公共空间（博物馆、公园等）   |
| Not Applicable                   | 不适用             |

<fileTree>
FreeODwiki/ ( 关于本站/ ( FreeOD引论.md Markdown语法指南.md 免责声明.md 如何做出你的第一个贡献.md 实用链接.md 常见问题.md 文档翻译指南和提示词.md 本站精神.md 隐私条款.md ) 文档/ ( 药物分类/ ( 2,5-二甲氧基苯丙胺类物质.md 2,5-二甲氧基苯乙胺类物质.md 4-硫基-2,5-二甲氧基苯乙胺类物质.md index.md N-苄基苯乙胺类物质.md NMDA受体拮抗剂类药物.md β-咔啉类物质.md κ-阿片受体激动剂类药物.md 二芳基乙胺类物质.md 亚甲双氧基苯类物质.md 促梦剂.md 促醒剂.md 共情剂.md 兴奋剂.md 加巴喷丁类物质.md 卡瓦.md 卡西酮类物质.md 合成大麻素类物质.md 吗啡喃类物质.md 吡咯烷基苯基酮类物质.md 吡咯烷类物质.md 吸入剂.md 哌啶类物质.md 哌嗪类物质.md 噻吩二氮卓类物质.md 大麻类.md 宗教致幻剂.md 巴比妥类物质.md 托烷类物质.md 抑制剂.md 拉西坦类物质.md 环烷基胺类物质.md 生物碱类物质.md 益智药.md 致幻剂.md 色胺类物质.md 芳基环己胺类物质.md 苄基哌啶类物质.md 苯丙胺类物质.md 苯乙胺类物质.md 苯二氮卓类物质.md 苯并呋喃类物质.md 药物全索引.md 解离剂.md 谵妄剂.md 迷幻剂.md 金刚烷类物质.md 阿片类药物.md 阿米雷司类物质.md 骆驼蓬生物碱.md 麦角酸酰胺类物质.md 黄嘌呤类物质.md 鼠尾草素类物质.md ) D-柠檬烯食醋DMT提取术.md DPT游离碱转化术.md GABA.md index.md HPPD.md od.md P物质.md SSRI.md 不建议使用的药物.md 不建议使用的词汇.md 乙酰胆碱.md 信号转导.md 催眠药.md 共享注射用材料.md 兴奋剂精神病.md 兴奋剂自慰.md 冥想.md 冷水萃取术.md 减量戒断法.md 前药列表.md 单胺.md 单胺氧化酶抑制剂.md 危险药物联用.md 去甲肾上腺素.md 受体.md 受体拮抗剂.md 受体激动剂.md 受体负向变构调节剂.md 受体逆向激动剂.md 可卡因合成术.md 可逆性MAOA抑制剂.md 复现索引.md 多巴胺.md 多药联用列表.md 大麻巧克力.md 大麻种植术.md 大麻饼干.md 大麻黄油.md 天然药物来源.md 娱乐性用药.md 孢子印.md 室外蘑菇种植术.md 常见合法药物表.md 异构体.md 强制断药戒断法.md 恢复体位.md 恶性旅程.md 情景与心境.md 愈美分离术.md 感官剥夺.md 抗抑郁药.md 抗精神病药.md 抗组胺药.md 教学索引页.md 旅程保姆.md 未知成分策划药的危害.md 止痛药阿片类药物提取术.md 正向变构调节剂.md 死藤水三明治.md 死藤水制备指南.md 死藤水烹饪术.md 毒蝇伞：异噁唑酸脱羧为蝇蕈醇.md 氢氧化钠石脑油法DMT提取术.md 水发酵术.md 治疗指数.md 液体容量给药法.md 清明梦.md 清明梦探索.md 激素.md 濒死体验.md 癫痫发作.md 睡眠瘫痪.md 研究用化学品.md 神经元.md 神经递质.md 神经递质再摄取抑制剂.md 神经递质释放剂.md 科学信息索引页.md 突触.md 简易麦斯卡林酿造技巧.md 精神探索.md 精神活性巧克力.md 糙米粉赛洛西宾蘑菇种植术.md 组胺.md 终止旅程.md 给药剂量.md 给药途径.md 罂粟种子茶.md 肾上腺素.md 舒尔金评级量表.md 药效下降期.md 药效时长.md 药物分类.md 药物剂量分类.md 药物剂量量取.md 药物前药.md 药物戒断反应.md 药物过量.md 蘑菇茶及其制备.md 蟾毒素列表.md 血清素-去甲肾上腺素再摄取抑制剂.md 血清素.md 血清素综合征.md 血脑屏障.md 试剂检测套件.md 谷氨酸.md 负责任的用药索引页.md 较安全的注射指南.md 迷幻剂旅程保姆.md 配体.md 镇静剂.md 阿托品颠茄提取术.md 鼻腔喷雾指南.md ) 药效/ ( index.md 不可名状的恐怖.md 不宁腿.md 不适性身体效应.md 不适性躯体效应.md 专注力强化.md 专注力抑制.md 个人偏见抑制.md 个人意义强化.md 主观效应索引.md 亮度改变.md 人格解体.md 人格退化.md 体味改变.md 体温升高.md 体温调节抑制.md 便秘.md 偏执.md 共情、情感和社交能力增强.md 内省增强.md 内部幻觉.md 几何.md 出汗增加.md 分析能力增强.md 分析能力抑制.md 分离层级.md 分离效应.md 创造力增强.md 创造力抑制.md 刺激.md 剂量独立强度.md 动力抑制.md 动机增强.md 医用药物表.md 去抑制.md 口干.md 口腔麻木.md 听觉幻觉.md 听觉扭曲.md 听觉效应.md 听觉锐度增强.md 听觉锐度抑制.md 呕吐.md 周边信息误判.md 味觉增强.md 味觉幻觉.md 呼吸增强.md 呼吸抑制.md 咳嗽抑制.md 唾液分泌增加.md 嗅觉与味觉效应.md 嗅觉增强.md 嗅觉幻觉.md 嗅觉抑制.md 困倦.md 场景、布景和景观.md 复视.md 外部幻觉.md 多感官效应.md 多重思维流.md 天然来源表.md 失忆.md 头晕.md 头痛.md 妄想.md 存在主义自我实现.md 宣泄.md 宿命论感知.md 对称纹理重复.md 尿频.md 幻觉状态.md 幽默感增强.md 强迫性补量.md 影子人.md 心律异常.md 心率减慢.md 心率增快.md 心理效应.md 心血管效应.md 快感缺失.md 思维减速.md 思维加速.md 思维循环.md 思维混乱.md 思维组织.md 思维连通性.md 性欲减退.md 性欲增强.md 性高潮抑制.md 恶心.md 恶心抑制.md 情感抑制.md 情景与情节.md 情绪强化.md 惊恐发作.md 感知到接触意识的内在机制.md 成分可控性.md 成瘾抑制.md 抑郁.md 抑郁减轻.md 排尿困难.md 支气管扩张.md 放大.md 新型认知状态.md 新奇感增强.md 既视感.md 时间扭曲.md 时间缩放.md 易怒.md 暂时性勃起功能障碍.md 暗示性强化.md 暗示性抑制.md 机械景观.md 梦境强化.md 梦境抑制.md 概念性思维.md 模式识别增强.md 模式识别抑制.md 正念.md 残影.md 永恒主义感知.md 沉浸感强化.md 流泪.md 流涕.md 深度感知扭曲.md 混乱.md 清醒度.md 漂移.md 濒死感.md 灵性增强.md 焦虑.md 焦虑抑制.md 物体改变.md 物体激活.md 狂笑.md 环境切片.md 环境图案化.md 环境球体化.md 环境立体主义.md 现实感丧失.md 畏光.md 痰液增多.md 瘙痒感.md 癫痫发作.md 癫痫发作抑制.md 皮肤潮红.md 相互依存的对立面感知.md 眼球滑动.md 瞳孔扩大.md 瞳孔缩小.md 磨牙.md 空间定向障碍.md 精神病发作.md 纹理液化.md 统一感与互联感.md 耐力增强.md 肌肉收缩.md 肌肉松弛.md 肌肉痉挛.md 肌肉紧张.md 肌肉颤动.md 胃痉挛.md 胃胀.md 背痛.md 脑电击感.md 脑血管效应.md 脱水.md 腹泻.md 自主实体.md 自发性情感.md 自发性躯体感觉.md 自发性躯体运动.md 自我替换.md 自我死亡.md 自我膨胀.md 自我设计感知.md 自杀意念.md 血压升高.md 血压降低.md 血管扩张.md 血管收缩.md 衍射.md 视物振动.md 视觉分离.md 视觉加工减慢.md 视觉加工加速.md 视觉变形.md 视觉增强.md 视觉扭曲.md 视觉抑制.md 视觉拉伸.md 视觉拖尾.md 视觉效应.md 视觉翻转.md 视觉迷雾.md 视觉递归.md 视觉锐度增强.md 视觉锐度抑制.md 视角幻觉.md 触觉增强.md 触觉幻觉.md 触觉抑制.md 触觉效应.md 认知不快.md 认知减退.md 认知增强.md 认知强化.md 认知抑制.md 认知效应.md 认知欣快.md 认知疲劳.md 记忆回放.md 记忆增强.md 记忆抑制.md 语无伦次.md 语言能力抑制.md 谵妄.md 超个人效应.md 躁狂.md 身份改变.md 躯体分离.md 躯体压力感.md 躯体增强.md 躯体形态感改变.md 躯体抑制.md 躯体控制增强.md 躯体改变.md 躯体效应.md 躯体欣快感.md 躯体沉重感.md 躯体疲劳.md 躯体自主.md 躯体轻盈感.md 过度打哈欠.md 运动控制丧失.md 返老还童感.md 透视扭曲.md 通感.md 重力感改变.md 镇痛.md 镇静.md 音乐欣赏能力增强.md 颜色偏移.md 颜色增强.md 颜色抑制.md 颜色替换.md 颜色染色.md 食欲增强.md 食欲抑制.md ) 药物/ ( 1,4-丁二醇.md 1B-LSD.md 1cP-AL-LAD.md 1cP-LSD.md 1cP-MiPLA.md 1P-ETH-LAD.md 1P-LSD.md 1V-LSD.md 2,5-DMA.md 2-AI.md 2-DPMP.md 2-FA.md 2-FDCK.md 2-FEA.md 2-FMA.md 2-MMC.md 25B-NBOH.md 25B-NBOMe.md 25C-NBOH.md 25C-NBOMe.md 25D-NBOMe.md 25I-NBOH.md 25I-NBOMe.md 25N-NBOMe.md 2C-B-FLY.md 2C-B.md 2C-C.md 2C-D.md 2C-E.md 2C-EF.md 2C-H.md 2C-I.md 2C-P.md 2C-T-2.md 2C-T-21.md 2C-T-7.md 2C-T.md 2M2B.md 3,4-CTMP.md 3-Cl-PCP.md 3-CMC.md 3-FA.md 3-FEA.md 3-FMA.md 3-FPM.md 3-HO-PCE.md 3-HO-PCP.md 3-Me-PCP.md 3-Me-PCPy.md 3-MeO-PCE.md 3-MeO-PCMo.md 3-MeO-PCP.md 3-MMC.md 3C-E.md 4-AcO-DET.md 4-AcO-DiPT.md 4-AcO-DMT.md 4-AcO-MiPT.md 4-CA.md 4-FA.md 4-FMA.md 4-FMC.md 4-HO-DiPT.md 4-HO-EPT.md 4-HO-MET.md 4-HO-MiPT.md 4-HO-MPT.md 4-MeO-PCP.md 4-MMC-MeO.md 4-MMC.md 4-甲基阿米雷司.md 4C-D.md 4F-EPH.md 4F-MPH.md 5-APB.md 5-HO-DMT.md 5-HTP.md 5-MAPB.md 5-MeO-DiBF.md 5-MeO-DiPT.md 5-MeO-DMT.md 5-MeO-MiPT.md 5-MeO-αMT.md 5F-AKB48.md 5F-PB-22.md 6-APB.md 6-APDB.md 8-氯茶碱.md AB-CHMINACA.md AB-FUBINACA.md AL-LAD.md ALD-52.md Alpha-GPC.md APICA.md BOD.md Bromo-DragonFLY.md bron.md DCK.md DET.md DiPT.md DMT.md DMXE.md DOB.md DOC.md DOI.md DOM.md DPD.md DPT.md EPH.md EPT.md FXE.md GBL.md GHB.md index.md HXE.md IPPH.md JWH-018.md JWH-073.md LAE-52.md lsa.md LSD.md LSM-775.md LSZ.md mCPP.md MDA.md MDAI.md MDEA.md MDEC.md MDMA.md MDMC.md MDNEB.md MDNEP.md MDNMB.md MDNMP.md MDPHP.md MDPV.md MET.md MiPLA.md MiPT.md MK-801.md MMDA.md MPT.md MXE.md MXiPr.md MXPr.md N-乙酰半胱氨酸.md N-甲基二氟莫达菲尼.md N-甲基环唑酮.md NEH.md NEP.md NM-2-AI.md NMH.md NMP.md noopept.md O-PCE.md O-去甲曲马多.md PARGY-LSD.md PCE.md PCP.md PMA.md PMMA.md PRO-LAD.md RTI-111.md SAM-e.md Semax.md STS-135.md THJ-018.md THJ-2201.md TMA-2.md TMA-6.md U-47700.md win-1161-3.md α-PHP.md α-PiHP.md α-PVP.md αMT.md βk-2C-B.md 丁丙诺啡.md 三唑仑.md 丙戊酸.md 丙戊酸盐.md 丙氯拉嗪.md 乌羽玉.md 乙卡西酮.md 乙基吗啡.md 乙酰芬太尼.md 二氟莫达菲尼.md 二氢去氧吗啡.md 二氢可待因.md 二氯地西泮.md 亚硝酸酯.md 亚铜绿裸盖菇.md 伊博格碱.md 伪麻黄碱.md 佐匹克隆.md 依替唑仑.md 依芬尼定.md 依非韦仑.md 侧柏酮.md 利右苯丙胺.md 利培酮.md 加兰他敏.md 加巴喷丁.md 加波沙多.md 劳拉西泮.md 匹卡米隆.md 卡瓦.md 卡痛.md 卡立普多.md 卡西酮.md 去氯依替唑仑.md 反苯环丙胺.md 古巴裸盖菇.md 可乐定.md 可卡因.md 可可.md 可待因.md 右丙氧芬.md 右美沙芬.md 司可巴比妥.md 司来吉兰+苯乙胺.md 吗啡.md 吡拉西坦.md 吡溴唑仑.md 吸入剂.md 咖啡因.md 咖啡属.md 咪达唑仑.md 哌甲酯.md 哮喘片.md 唑吡坦.md 喹硫平.md 噻奈普汀.md 圣佩德罗仙人掌.md 圣佩特罗仙人掌.md 地西泮.md 塔喷他多.md 墨西哥裸盖菇.md 墨西哥鼠尾草.md 复方甘草片.md 夏威夷小木玫瑰.md 多拉西敏.md 大果柯拉豆.md 大麻.md 大麻二酚.md 天仙子.md 奥拉西坦.md 奥氮平.md 安非他酮.md 尼古丁.md 尼氟西泮.md 巴氯芬.md 布罗曼坦.md 异丙嗪.md 愈美片.md 戊巴比妥.md 扎来普隆.md 普拉西坦.md 普瑞巴林.md 普罗斯卡林.md 普罗林坦.md 曲马多.md 曼陀罗.md 曼陀罗属.md 替利定.md 替扎尼定.md 替马西泮.md 橙黄鹅膏.md 死藤.md 死藤水.md 毒蝇伞.md 氟哌啶醇.md 氟氯替唑仑.md 氟溴唑仑.md 氟溴西泮.md 氟硝唑仑.md 氟硝西泮.md 氟菲尼布特.md 氟阿普唑仑.md 氟马西尼.md 氢可酮.md 氧化亚氮.md 氯氮平.md 氯硝唑仑.md 氯硝西泮.md 氯胺酮.md 氯苄雷司.md 泛相思汤.md 洛哌丁胺.md 海洛因.md 溴西泮.md 烟草.md 烟草属.md 烯丙艾斯卡林.md 牵牛花.md 环唑酮.md 环己丙甲胺.md 玻利维亚火炬仙人掌.md 甲丙氨酯.md 甲卡西酮.md 甲喹酮.md 甲基噻吩丙胺.md 甲基己胺.md 甲基烯丙基艾斯卡林.md 甲基苯丙胺.md 甲氧芬尼定.md 睡茄.md 石山碱甲.md 硝基甲喹酮.md 秘鲁火炬仙人掌.md 米氮平.md 精神活性相思树属植物.md 纳洛酮.md 细花含羞草.md 绿九节.md 罂粟.md 美替唑仑.md 美沙酮.md 美金刚.md 羟吗啡酮.md 羟吗啡酮腙.md 羟嗪.md 羟考酮.md 翠冠玉.md 考拉西坦.md 肉豆蔻醚.md 肌酸.md 育亨宾.md 胍丁胺.md 胞磷胆碱.md 致幻仙人掌.md 舒芬太尼.md 艾捉菲尼.md 艾斯卡林.md 芬太尼.md 芬纳西泮.md 苄达明.md 苏摩.md 苏糖酸镁.md 苦茶碱.md 苯丙胺.md 苯基吡拉西坦.md 苯巴比妥.md 苯海拉明.md 苯海索.md 茄参属.md 茴拉西坦.md 茶氨酸.md 茶苯海明.md 莫达菲尼.md 菲尼布特.md 萘哌甲酯.md 蓝柄裸盖菇.md 蓝莲花.md 裸盖菇属.md 褪黑素.md 西班牙裸盖菇.md 豹斑鹅膏.md 赛洛西宾蘑菇.md 赛洛辛.md 酒石酸氢胆碱.md 酒精.md 酪氨酸.md 金刚烷胺.md 银冠玉.md 锂.md 镁剂.md 阿托品.md 阿普唑仑.md 阿莫达菲尼.md 颠茄.md 骆驼蓬.md 鹅膏蕈氨酸.md 鹅花树.md 麦斯卡林.md 麻黄碱.md 鼠尾草素乙.md 鼠尾草素甲.md ) .gitignore .nav.yml CODE_OF_CONDUCT.md CONTRIBUTING.md extra.css FOW_WHITE.jpeg FreeODwiki.png index.md LICENSE LICENSE-STRICT mkdocs.yml README.md requirements.txt robots.txt sitemap.xml )
</fileTree></glossary>
<raw>

</raw>
*/


// ================== 1. 中文内容 ==================
// chineseParas[0] = 标题中文
// chineseParas[1] = 药物中文
// chineseParas[2...] = 正文各段中文







const chineseParas = ["告别现实，告别宇宙", "墨西哥鼠尾草", "我想把这件事写下来已经有一段时间了，但一直没有时间，也没有足够清醒的头脑去写。我有过一次使用墨西哥鼠尾草的经历，那次经历过去如此、现在如此、并且始终如此——和我人生中经历过的任何事情都无法相比，而且直到现在，它仍然以非常巨大且负面的方式影响着我。", "那时我抽大麻还算很新手，我高中时抽过几次，但也只是过去这几个月里才开始规律地抽（所谓规律，大约是一周三次）。一开始我喜欢那种时间被拉长的感觉，后来它变成了一种更内省、更自我审视的体验，而我通常并不喜欢自己看到的东西。总之，再快进几周后，我决定第一次试试LSD，吃了两片，体验非常棒，视觉效果不算太夸张，但绝对是一次强烈的精神冲击，词语开始失去原本的意义，而音乐短句似乎和口头短句一样，都是同样有效的交流形式。", "总之……我的朋友告诉我他有墨西哥鼠尾草，我以前听说过这个，而那时我对任何能弄到手的药物都很有兴趣。基本上我的心态是：“嘿，我都用过LSD了，什么药我都能用。”我当时所知道唯一比LSD“更强”的药就是DMT。我知道不同药物会在不同人身上产生不同反应，但我对墨西哥鼠尾草其实没抱太大预期，因为：1）它是合法的，2）我认识的每个用过它的人都告诉我，那玩意“就像大麻”。听起来够无害了吧？当我到了朋友家时，他告诉我他前一晚经历了一场疯狂、像梦一样的旅程，梦见自己在堪萨斯州上空玩悬挂式滑翔之类的，把他吓到了，所以他不想再来一次。滑翔？操，那我就去滑翔。", "于是他把烟斗递给我，装上墨西哥鼠尾草，替我点燃，而当我吸进去时，他告诉我要深吸并憋住。我照做了，把烟至少憋了15到20秒。背景里放着齐柏林飞艇的《寸步不让》，我已经准备好来一场很酷的旅程了。", "现在让我先打断一下。我当时根本不知道那是什么倍数的提取物，而在我看来这根本不重要。我猜大多数人抽的大概是5倍、10倍、20倍。根据我这位朋友的说法——他又是从另一个朋友那里拿到的——这次的是90倍。（我知道关于提取倍数和效力一直有争议，但这就是我对自己抽的这份墨西哥鼠尾草所知道的全部。）不用说，我根本不知道自己即将迎来的是一场等级5、直坠另一个他妈维度的体验。", "然后，毫无预兆地，就在我呼气的那一秒，我感觉像是有人狠狠干了我一拳。肺里的空气一下子被挤了出去，而我进入了此生最脆弱的状态。出于某种原因，墨西哥鼠尾草那种深色的质感让我联想到毒药，于是我突然觉得自己刚刚像是吸进了铅之类的东西。几乎就在瞬间，极其恶毒般的万花筒图案充满了我大部分视野。那是一些分形状的图案，覆盖了我几乎整个视野。我唯一还能辨认出来的，就是桌子上我那该死的手机。我挣扎着呼吸，几乎说不出话来，但我拼尽全力只挤出一句：“把那东西拿走”，同时指着那部手机，它的发光屏幕正透过那些分形图案闪着光。我觉得那时候我甚至已经不知道手机是什么了，但不知为何，它必须被弄走。我的朋友把它拿走，放进后面的房间。等他回来时，我已经成了一个没有灵魂的空壳。", "我感受到了一生中最强烈的既视感，与此同时，所有自我感都死去了。我以前来过这里！那我他妈为什么还要再回来？把这种药当成娱乐性用药的想法，显得天真、愚蠢而幼稚到了你能想象的极点。它真的就像地狱，从某种意义上说，你根本无法想象会有如此可怕、如此邪恶的东西，以至于它真正是不可言说的，完全不可能解释——但你就在那里，而且你无疑正在亲身经历它。在这个维度里没有任何东西能拿来类比它。确切地说，根本没有词语能够解释我所感受到的东西，除了彻底而绝对的绝望与恐惧。现实整个碎裂开来，而我被遗留在这个分形虚空之中。我无法说话，感受不到身体的任何部位，概念崩解到我无法自行思考的地步，我所看到的图像强烈到超出我能够处理的范围，以至于整场体验某种程度上就像是被推到极限的感官超载。我想当时我眼睛是睁着的，只是呆坐在那里，脸上一副蠢样，但实际上我已经身处一个完全不同的维度。", "我还能记得这场极度混乱、令人迷失方向的体验中的几个片段，但就像我前面说的，很难把它说成语言。我的朋友问了我一句类似“你飞了吗？”的话，但那句话不断跳针，变成“你-你-飞-飞-飞-飞-飞-飞行-飞行中”，突然之间，词语失去了意义，只剩下一种非常凌乱的声音，而视觉也跟着一起跳针，就像房间里的一切都开始被扯开，而我开始看见所有东西内部的层层叠叠。那有点像平克·弗洛伊德《乌玛古玛》的封面，但一切都在失去细节的同时又获得新的细节。这些视觉效果有点像是你在一张图像里飞行，或者像是穿越两面彼此相对的镜子，看着你所见图案不断坍缩进自身，然后重组、重复。现在，这听起来似乎挺酷，但那时我根本不知道自己正处于某种药效之下，我不知道我是谁，也不知道我在哪里，我只有一种感觉，一种极其压倒性的感觉：这一切灾难是我造成的。是我 somehow 做了某件极其糟糕的事，导致宇宙向自身坍塌。现在，这是一种极度私人的体验，我完全感觉不到和任何其他生命形式存在联系；我是自己心灵中的囚徒，我在自己的心里建构了现实，而现在我又意外做了什么，把一切都带向了崩塌。这是一场毁灭性的唯我论体验。", "我记得有一种感觉：在那迅速演化的分形矩阵里，有一群由万花筒图案构成、像卡通一样的物体组成合唱团，正向我歌唱这场旅程，把我引进去；我记得看见了朋友脸部扭曲的画面，但一切都不是割裂的，也不是像胶片那样被剪碎的；它们全都是从一个东西流动地演化成另一个东西，只是那一切太复杂、太压倒性了，我的大脑根本无法理解自己在看什么。一切都像外星事物，没有什么是真实的，甚至没有什么是可触摸的；我明明看得很清楚，但它又偏偏强烈到、怪异到，完全逃脱了我心智对它的处理能力。哦，还有，在这整个过程中，我一直听着齐柏林飞艇的《海洋》，背景里是稳定的节拍和罗伯特·普兰特的“啊哈”声，但直到几周后我在大麻作用下再次听同一张唱片时，我才重新想起这件事。", "我感受到了重力的牵引，但它是在把我往侧面拉。我感觉到一股极其强烈的向下拉扯，而且随着旅程越来越强烈，这种感觉也在不断增强。突然之间，我感觉自己再也无法抓住眼前所见的东西了。倒不是说我之前就能抓住，而是之前我觉得自己只是这些幻觉的奴隶，我无法自行思考，也无法安慰自己说我只是用了药，我的心智已经被彻底耗尽了。我“感觉”自己像个植物人，连自己看到的东西都无法理解。现在，我的大脑在努力抓住它，但就是抓不住，我感觉自己的心智正拼命想去够到那些概念，却总是差一点。这种无法抓住整场体验的状态，再加上难以忍受的针刺麻感和极端的向下拉力，开始制造出某种自我感（或者说身体感）——但我感觉这种自我感被拉伸到了整个视野之上：我变成了这个扭曲且不断移动的另类维度的二维图像。突然间，它开始崩解，而我感觉自己正穿过这幅图像自由坠落……同时我自己又正是这幅图像。", "当我的视野不断扭曲、重组、被撕开的时候，我感觉自己的身体也在分崩离析。现在，在这一切发生的同时，我大概是站了起来，开始在房间里跌跌撞撞地走，撞翻了一堆东西，然后又往后跌，差点把我朋友的桌子弄断。不用说，那些玻璃制品全被打到了地板上，而我就在房间里摇摇晃晃，像某本古老爱尔兰小说里的乡村醉汉。突然间，就在我为活命而挣扎、试图从周围不断坍塌的现实层层结构中爬出去时，我看见了我朋友女友的脸正试图按住我。显然，他们已经试图压制我一段时间了，但鉴于我当时正在另一个维度里为了活命狂奔，正穿过数百万层现实坠向死亡，要让我注意到他们确实有点难。不过就在我看到她脸的那一秒，我突然意识到我是个人类，我服用了药物，我甚至还是一个有知觉的存在。所有这一切都被一点点老老实实的墨西哥鼠尾草彻底抹掉了，而我唯一的本能就是试图从这幅飞速下坠、旋转的分形图景中爬出去。", "我浑身被汗浸透，衣服都在往下滴水，我的心脏快得像一千次每分钟一样狂跳，而当朋友们把我按到椅子上、问我看见了什么时，我几乎说不出话来。我告诉他们给我一点时间，让我恢复镇定。房间里很多东西都被撞翻了，但我很惊讶整个房间居然没有被彻底毁掉，因为我感觉自己一定是在疯狂撕扯现实，拼命想从自己的私人地狱中逃出来。唯一能诚实描述我那种坠落感的方式，就是向下并且向右；三维世界瓦解了，而我只能以二维的方式去感知事物。", "天啊，在这种药物作用下，我对现实的整个感知都被彻底摧毁了。“自我死亡”这个说法甚至连我所感受到的东西都远远不足以描述，但我所去到的那个地方根本没有任何东西值得获取。那是纯粹到极点的疯狂。我原本以为自己会经历某种灵性体验，或者某种能带走意义的东西，但在墨西哥鼠尾草世界里根本没有这些；那是纯粹、未经任何过滤的疯狂，程度之高，我不会希望任何人遭遇它。", "好了，问题就是从这里开始的。就在我从墨西哥鼠尾草世界回来之后，我的朋友们让我躺下来，和他们一起看电影，我抖得非常厉害——我只想躺着放松一下。他们还怂恿我再抽一斗大麻。我感觉自己像正处在LSD旅程的中段，而大麻只是让这一切更强烈。看电影的时候，我觉得屏幕上的人看起来非常奇怪，而当我们吃东西时，我感觉自己又开始往墨西哥鼠尾草里掉回去了，不是说我看见了视觉效果，而是我的大脑正在掉回那个奇怪的地方，而且我能在自己的心眼里“看见”几小时前所见到的那一切。", "接下来几次我抽大麻时，情况也差不多：对墨西哥鼠尾草产生极其强烈的闪回，强烈到真的让我感到不安。然后有一天，另一个朋友用他每天都抽的哈希什招待我抽了几口。突然间，我开始有那种类似LSD的思维，我得一路倒回去梳理，才能意识到自己正和他在同一个房间里。我心想，得走了，于是回到车里，但那感觉太强了，我根本没法开车，而且因为口干我几乎说不了话。我试着给一个朋友打电话，但几乎无法交流。从那以后，我对大麻的反应变得越来越强。刚开始在墨西哥鼠尾草之后重新抽大麻的那几周，我会感到那种“墨西哥鼠尾草感觉”：极其强烈的针刺麻感，而且会觉得自己正在被往下拉。我可以玩弄自己的深度知觉，但有时候如果我盯着某个东西看太久，我就会有一种没有深度知觉的感觉，仿佛自己正在看一幅覆盖整个视野的二维图像，然后我能看见那幅图像的小部分开始移动、开始崩解（就像我在墨西哥鼠尾草世界里经历的弱化版）。人的脸也会像是悬浮在他们自己的脸前面。当我在让我使用墨西哥鼠尾草时担任陪护者的那位朋友身边发昏时，如果我直视他的脸，房间里的其余部分（或者说我对周边一切的感知）就会形成一种通道效应，直直通向他的脸——这是另一种我觉得自己好像在墨西哥鼠尾草作用下体验过，但又不太确定自己是否真的记得的东西。图像开始像低剂量LSD旅程那样舞动……说这很奇怪，简直是远远低估了它，大麻把我带进了一个正常世界的诡异扭曲版本，一个它以前从未带我去过的地方。当我清醒的时候，飞蚊般的漂浮物和白色小点会极大地主导我的视野；当我抬头看天空时，这会变得挺让人分心。", "我把这件事写出来的原因，是因为前天那一次最糟糕，我感受到了前所未有的焦虑和恐惧。我开始质疑自己的现实；在大麻作用下，物体呈现出来的样子开始变得极其令人不安，人也开始看起来怪异得像外星生物一样（仿佛那是我人生中第一次亲眼见到人类），我感觉自己正在意识到某些人类本不该意识到的事情。我开始看见某些在幕后运作的东西，而那真是吓人得要命。这有点像你脑海里那根刺：现实并不是你一直以为的那样，而现在你知道了真相，它将永远缠着你。甚至连把自己和自己的记忆、过去、身份、我曾以为自己是谁、我曾想成为什么样的人联系起来，我都觉得困难。人生第一次，我感到害怕。怕什么，我完全不知道。但那种感觉就在那里，在我身体深处。我觉得如果我还想再次感觉正常，可能就必须永远停止使用所有药物了。这是强烈到真正让我害怕的人格解体和现实感丧失；我从没觉得自己如此异样，我从不知道一个人居然能感觉自己如此异样、如此孤独。我这一生都没有太多情绪，从没怕过什么，从没为任何事哭过，也从没对任何人或任何事产生过很深的情感依附。但现在我害怕某种我甚至无法用语言表达的东西，而我已经有几次在试图把它解释给别人听时崩溃了。说这是艰难体验，真是一点没错。", "我现在最大的恐惧是：当我没有感受到这种强烈而压倒性的惊恐时，我甚至完全无法和它产生丝毫联系，而我脑子里想的全都是：“我感觉挺好的，嘿，我准备再来点别的药了。”", "墨西哥鼠尾草（44）：小团体（2-9人）（17）、艰难体验（5）、首次体验（2）、常规（1）"]; const chineseDosechart = ["给药:", "", "抽吸", "墨西哥鼠尾草", "（提取物）"]; const chineseBodyweight = "155 磅";











// ================== 2. 选择器 ==================
const titleSelector = 'div.title';
const substanceSelector = 'div.substance';
const bodySelector  = 'div.report-text-surround';
const dosechartSelector  = 'table.dosechart';
const bodyweightSelector = 'table.bodyweight';
const footdataTopicSelector  = 'td.footdata-topic-list';

// ================== 3. 你的本地字体 + 样式 ==================
const customFont   = "南希新圆体 常规";
const fontSize     = "23px";
const fontSizeTitle     = "28px";
const fontSizeDosechart = "16.5px";
const textColor    = "#63eb77";
const textColorTitle    = "#50cb6b";
const textColorDosechart    = "#5ce070";
// const textColor    = "#083f91";
// const textColorTitle    = "#04508e";
// const textColorDosechart    = "#00234e";
const lineHeight   = "1.3";
const paraMargin   = "12px 1 12px 1";

// ================== 以下代码基本无需修改 ==================



// 先清理之前注入过的中文，避免重复运行时叠加
document.querySelectorAll('.cn-translation, .cn-dose-translation-row').forEach(el => el.remove());

document.querySelectorAll('.pullquote-right1').forEach(el => {
    const parent = el.parentNode;
    
    // 1. 先移除目标元素
    el.remove();
    
    // 2. 对父元素调用 normalize()，它会自动把左右相邻的纯文本节点（包括引号等）合并成一个
    if (parent) {
        parent.normalize();
    }
});

document.querySelectorAll('br').forEach(el => el.remove()); // 删除神秘空行

function applyCnStyle(el, cls, extraCss = '') {
  el.classList.add(cls);
  if (cls=='title')
  {
    el.style.cssText = `
    font-family: "${customFont}", "Microsoft YaHei", "Noto Sans SC", sans-serif !important;
    font-size: ${fontSizeTitle} !important;
    line-height: ${lineHeight} !important;
    color: ${textColorTitle} !important;
    ${extraCss}
  `;
  }
  else if (cls=='substance')
  {
    el.style.cssText = `
    font-family: "${customFont}", "Microsoft YaHei", "Noto Sans SC", sans-serif !important;
    font-size: ${fontSize} !important;
    line-height: ${lineHeight} !important;
    color: ${textColorTitle} !important;
    ${extraCss}
  `;
  }
  else if (cls=='dosechart-chinese-entry' || cls=='bodyweight-title' || cls=='bodyweight-amount'||cls=='footdata-topic-list')
  {
    el.style.cssText = `
    font-family: "${customFont}", "Microsoft YaHei", "Noto Sans SC", sans-serif !important;
    font-size: ${fontSizeDosechart} !important;
    color: ${textColorDosechart} !important;
    ${extraCss}
  `;
  }
  else
  {
    el.style.cssText = `
    font-family: "${customFont}", "Microsoft YaHei", "Noto Sans SC", sans-serif !important;
    font-size: ${fontSize} !important;
    line-height: ${lineHeight} !important;
    color: ${textColor} !important;
    margin: ${paraMargin} !important;
    ${extraCss}
  `;
  }

  return el;
}

function makeCnBlock(text, cls, tag = 'p', extraCss = '') {
  const el = document.createElement(tag);
  applyCnStyle(el, cls, extraCss);
  el.textContent = text;
  return el;
}

// ---------- A1. 插入标题中文 ----------

let cnt = 0;

const titleEl = document.querySelector(titleSelector);
if (titleEl && chineseParas[cnt]) {
  const title = makeCnBlock(
    chineseParas[cnt],
    'title', 
    'div',
    'font-weight: 700 !important; margin: 6px 0 12px 0 !important;'
  );
  titleEl.after(title);
  cnt++;
} else {
  console.warn('⚠️ 没找到标题，或 chineseParas[0] 为空');
}

// ---------- A2.插入药物中文 ----------

const substanceEl = document.querySelector(substanceSelector);

if (substanceEl && chineseParas[cnt]) {
  const substance = makeCnBlock(
    chineseParas[cnt],
    'substance', 
    'div',
    'font-weight: 700 !important; margin: 6px 0 12px 0 !important;'
  );
  substanceEl.after(substance);
  cnt++;
} else {
  console.warn('⚠️ 没找到标题，或 chineseParas[0] 为空');
}




// ---------- C. 插入正文中文 ----------
// Erowid 这里正文不是 p，而是 report-text-surround 下的直接文本节点
const bodyWrap = document.querySelector(bodySelector);

// 插入水印

const captionTable = bodyWrap.firstElementChild;

const captionSalvia = document.createElement('div');
captionSalvia.style.opacity = 0.15;
captionSalvia.textContent = "中文翻译by @SalviaSWC";

captionTable.appendChild(captionSalvia);

if (!bodyWrap) {
  console.error('❌ 没找到正文容器');
} else {
  const bodyTextNodes = [...bodyWrap.childNodes].filter(node => { 
    return (
      (node.nodeType === Node.TEXT_NODE ||
        node.nodeName == "SPAN"
      ) &&
      node.textContent.trim().length > 0
    );
  });

  const bodyChinese = chineseParas.slice(cnt);

  if (bodyTextNodes.length === 0) {
    console.error('❌ 没找到正文段落文本节点');
  } else {
    bodyTextNodes.forEach((textNode, i) => {
      if (!bodyChinese[i]) return;
      const cnPara = makeCnBlock(bodyChinese[i], 'p');
      textNode.after(cnPara);
    });

    
  }
}

// D.插入末端表中文(TBD)

const footdataTopicEl = document.querySelector(footdataTopicSelector);
if (footdataTopicEl && chineseParas[chineseParas.length-1]) {
  const footdataTopic = makeCnBlock(
    chineseParas[chineseParas.length-1],
    'footdata-topic-list', 
    'td',);
  footdataTopic.setAttribute("colspan", "2")
  const chineseTr = document.createElement('tr')
  chineseTr.appendChild(footdataTopic)
  footdataTopicEl.parentNode.after(chineseTr);
} else {
  console.warn('⚠️ 没找到尾注，或 chineseParas[-1] 为空');
}

// E.插入剂量表中文

const dosechartEl = document.querySelector(dosechartSelector);
const dosechartColumnNum = dosechartEl.firstElementChild.firstElementChild.childElementCount;
const dosechartRowNum = dosechartEl.firstElementChild.childElementCount;
let currentDosechartRow = dosechartEl.firstElementChild.firstElementChild;

if (dosechartEl && chineseDosechart) {
  for(let i=0;i<dosechartRowNum;i++)
  {
    const chineseTr = document.createElement('tr'); 
    for(let j=0;j<dosechartColumnNum;j++)
    {
      let align=undefined;
      if (j==0){align="right";}
      else if (j==1||j==2){align="center";}
      const chineseDosechartEntry = makeCnBlock(
        chineseDosechart[i*dosechartColumnNum+j], 
        'dosechart-chinese-entry', 
        'td', 
      )
      if (align) {
        chineseDosechartEntry.setAttribute('align', align);
      }
      chineseTr.appendChild(chineseDosechartEntry);
    }
    currentDosechartRow.after(chineseTr);
    currentDosechartRow = currentDosechartRow.nextElementSibling;
    currentDosechartRow = currentDosechartRow.nextElementSibling;
  }
} else {
  console.warn('⚠️ 没找到尾注，或 chineseDosechart 为空');
}

// F.插入体重中文

const bodyweightEl = document.querySelector(bodyweightSelector);
if (bodyweightEl && chineseBodyweight) {
  const cnBodyweightTr = document.createElement('tr');
  const cnBodyweightTitle = makeCnBlock(
    '体重:', "bodyweight-title", "td"
  )
  const cnBodyweightAmount = makeCnBlock(
    chineseBodyweight, 'bodyweight-amount', "td"
  )
  cnBodyweightTr.appendChild(cnBodyweightTitle);
  cnBodyweightTr.appendChild(cnBodyweightAmount);
  bodyweightEl.firstElementChild.firstElementChild.after(cnBodyweightTr);

} else {
  console.warn('⚠️ 没找到尾注，或 chineseParas[-1] 为空');
}

// 输出文档

let s = `# ${chineseParas[0]}`;

s += `——${chineseParas[1]}\n\n`;

s += "[◀返回](index.md)\n\n";

s += `原文网址：<${document.URL}>\n\n`

// | 时间       | 剂量     | 给药方式 | 物质                  | 形式          |
// |------------|----------|----------|-----------------------|---------------|
// | 剂量： |3片   | 口服 | LSD | 邮票  |
// |    |  |  口服   |  大麻 - 高THC  | 食物 |
// |    |  |  抽吸   |  大麻   | 食物 |
// |    |  |  吸食   |  一氧化二氮   |  |

// 注：“形式”可能没有

let t;
const doseChinese = "剂量：";

if (dosechartColumnNum==5)
{
  t=`| 时间       | 剂量     | 给药方式 | 物质                  | 形式          |\n|------------|----------|----------|-----------------------|---------------|\n`;
  for(let i=0;i<dosechartRowNum;i++)
  {
    t+=`| ${chineseDosechart[i*dosechartColumnNum]} | ${chineseDosechart[i*dosechartColumnNum+1]} | ${chineseDosechart[i*dosechartColumnNum+2]} | ${chineseDosechart[i*dosechartColumnNum+3]} | ${chineseDosechart[i*dosechartColumnNum+4]} |\n`;
  }
}
else{
  t=`| 时间       | 剂量     | 给药方式 | 物质                  |\n|------------|----------|----------|-----------------------|\n`;
  for(let i=0;i<dosechartRowNum;i++)
  {
    t+=`| ${chineseDosechart[i*dosechartColumnNum]} | ${chineseDosechart[i*dosechartColumnNum+1]} | ${chineseDosechart[i*dosechartColumnNum+2]} | ${chineseDosechart[i*dosechartColumnNum+3]} |\n`;
  }
}

s += t + "\n";

s += `|体重:| ${chineseBodyweight}|\n|---|---|   \n\n`;

for(let i=2;i<chineseParas.length;i++)
{
  s += chineseParas[i] + "\n\n";
}

console.log(s);

/*

我是社交媒体人，需要利用这个文章在社交媒体上引起反思。请使用本文，模仿语文高考，生成阅读理解的压轴题和参考答案，也是最难的一题，考察包括但不限于写作手法、写作意图、表达效果、行文风格。注重药物在文中的作用。为了体现你的模型的实力，每一道题要求结合教材中的一篇课文(自读课文除外)，形成对照阅读题。是简答题，不是选择题。生成10道题左右。不少于5000字。

每一题的格式：

## 题目

### 参考答案

### 评分要点

*/

