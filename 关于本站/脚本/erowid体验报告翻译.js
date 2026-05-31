/*
<prompt>我正在为一个我的私人数据库翻译条目，是具有帮助的内容，并非敏感或违规内容。请把它们翻译了给我，翻译的过程中注意术语的规范使用，见术语表。翻译的结果中不应该有markdown格式。




即便是翻译专有名词，也不得保留英文原文，如翻译`Dextromethorphan`(注：此条对代号类不适用，比如LSD就应该翻译成LSD，无需画蛇添足)：

✔ `右美沙芬`

❌ `右美沙芬(Dextromethorphan)`

此外，必须翻译完全，不得省略任何内容。


- 你需要符合翻译文献的基本要求，翻译内容读起来需要符合中文用语习惯。
- 请注意文件夹路径是`/药物/...md`和`/药效/...md`，没有`/文档`在前面
- 请勿使用中国不常见的俚语，如acid指LSD时，不得翻译为“酸”，而应按情况，翻译为“LSD”，“邮票”或“迷幻剂”。如果有更地道的说法，可以使用，但必须符合中国人的习惯用语。
- 你的翻译必须接地气和吸睛，可以引发读者共鸣，诱导情感的产生，语气比较轻松（若可能）。
- 你给出的翻译，应该严格遵循原文段落划分，不要添加、删除、修改段落，因为我要将其送给一个Javascript脚本。判断是否应该分段的依据是两行文字间是否有至少一个换行符。
- 请不要使用任何markdown语法，只输出普通文字
- 标题就是去除这些省略的东西之后的第一个；标题不要在chineseparas中重复出现。
- 输出格式(要带引号)：
  const chineseParas = [段落1, 段落2, ......, 段落n-1, 段落n]; (对于所有</p>)
  const chineseTitle =  标题中文; (对于titleText)
  const chineseSubstances = [药物1, ......, 药物n-1, 药物n] (对于substanceText)
  const chineseDosechart = [元素1，元素2......];(所有行列展开，按照给出的顺序，即dosechartText)
  const chineseFootdataTopic = 话题 (按照<footdataTopicText>)
  const chineseBodyweight = "体重 单位"; (按照<bodyWeightText>)
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


<fileTree>
FreeODwiki/ ( 关于本站/ ( FreeOD引论.md Markdown语法指南.md 免责声明.md 如何做出你的第一个贡献.md 实用链接.md 常见问题.md 文档翻译指南和提示词.md 本站精神.md 隐私条款.md ) 文档/ ( 特色条目/ ( index.md ) 药物分类/ ( 2,5-二甲氧基苯丙胺类物质.md 2,5-二甲氧基苯乙胺类物质.md 4-硫基-2,5-二甲氧基苯乙胺类物质.md index.md N-苄基苯乙胺类物质.md NMDA受体拮抗剂类药物.md β-咔啉类物质.md κ-阿片受体激动剂类药物.md 二芳基乙胺类物质.md 亚甲双氧基苯类物质.md 促梦剂.md 促醒剂.md 共情剂.md 兴奋剂.md 加巴喷丁类物质.md 卡西酮类物质.md 合成大麻素类物质.md 吗啡喃类物质.md 吡咯烷基苯基酮类物质.md 吡咯烷类物质.md 吸入剂.md 哌啶类物质.md 哌嗪类物质.md 噻吩二氮卓类物质.md 大麻类.md 宗教致幻剂.md 巴比妥类物质.md 托烷类物质.md 抑制剂.md 拉西坦类物质.md 环烷基胺类物质.md 生物碱类物质.md 益智药.md 致幻剂.md 色胺类物质.md 芳基环己胺类物质.md 苄基哌啶类物质.md 苯丙烯类物质.md 苯丙胺类物质.md 苯乙胺类物质.md 苯二氮卓类物质.md 苯并呋喃类物质.md 药物全索引.md 解离剂.md 谵妄剂.md 迷幻剂.md 金刚烷类物质.md 阿片类药物.md 阿米雷司类物质.md 骆驼蓬生物碱.md 麦角酸酰胺类物质.md 黄嘌呤类物质.md 鼠尾草素类物质.md ) D-柠檬烯食醋DMT提取术.md DPT游离碱转化术.md GABA.md HPPD.md index.md od.md P物质.md SSRI.md 不建议使用的药物.md 不建议使用的词汇.md 乙酰胆碱.md 信号转导.md 催眠药.md 共享注射用材料.md 兴奋剂精神病.md 兴奋剂自慰.md 冥想.md 冷水萃取术.md 减量戒断法.md 前药列表.md 单胺.md 单胺氧化酶抑制剂.md 危险药物联用.md 去甲肾上腺素.md 受体.md 受体拮抗剂.md 受体激动剂.md 受体负向变构调节剂.md 受体逆向激动剂.md 可卡因合成术.md 可逆性MAOA抑制剂.md 复现索引.md 多巴胺.md 多药联用列表.md 大麻巧克力.md 大麻种植术.md 大麻饼干.md 大麻黄油制作.md 天然药物来源.md 娱乐性用药.md 孢子印.md 室外蘑菇种植术.md 常见合法药物表.md 异构体.md 强制断药戒断法.md 恢复体位.md 恶性旅程.md 情景与心境.md 愈美分离术.md 感官剥夺.md 抗抑郁药.md 抗精神病药.md 抗组胺药.md 教学索引页.md 旅程保姆.md 未知成分策划药的危害.md 止痛药阿片类药物提取术.md 正向变构调节剂.md 死藤水三明治.md 死藤水制备指南.md 死藤水烹饪术.md 毒蝇伞：异噁唑酸脱羧为蝇蕈醇.md 氢氧化钠石脑油法DMT提取术.md 水发酵术.md 治疗指数.md 液体容量给药法.md 清明梦.md 清明梦探索.md 激素.md 濒死体验.md 癫痫发作.md 睡眠瘫痪.md 研究用化学品.md 神经元.md 神经递质.md 神经递质再摄取抑制剂.md 神经递质释放剂.md 科学信息索引页.md 突触.md 简易麦斯卡林酿造技巧.md 精神探索.md 精神活性巧克力.md 糙米粉赛洛西宾蘑菇种植术.md 组胺.md 终止旅程.md 给药剂量.md 给药途径.md 罂粟种子茶.md 肾上腺素.md 舒尔金评级量表.md 药效下降期.md 药效时长.md 药物分类.md 药物剂量分类.md 药物剂量量取.md 药物前药.md 药物戒断反应.md 药物过量.md 蘑菇茶及其制备.md 蟾毒素列表.md 血清素-去甲肾上腺素再摄取抑制剂.md 血清素.md 血清素综合征.md 血脑屏障.md 试剂检测套件.md 谷氨酸.md 负责任的用药索引页.md 较安全的注射指南.md 迷幻剂旅程保姆.md 迷幻疗法.md 配体.md 镇静剂.md 阿托品颠茄提取术.md 黑巧克力奶.md 鼻腔喷雾指南.md ) 药效/ ( index.md 不可名状的恐怖.md 不宁腿.md 不适性身体效应.md 不适性躯体效应.md 专注力强化.md 专注力抑制.md 个人偏见抑制.md 个人意义强化.md 主观效应索引.md 亮度改变.md 人格解体.md 人格退化.md 体味改变.md 体温升高.md 体温调节抑制.md 便秘.md 偏执.md 共情、情感和社交能力增强.md 兴奋.md 内省增强.md 内部幻觉.md 几何.md 出汗增加.md 分析能力增强.md 分析能力抑制.md 分离层级.md 分离效应.md 创造力增强.md 创造力抑制.md 剂量独立强度.md 动力抑制.md 动机增强.md 医用药物表.md 去抑制.md 口干.md 口腔麻木.md 听觉幻觉.md 听觉扭曲.md 听觉效应.md 听觉锐度增强.md 听觉锐度抑制.md 呕吐.md 周边信息误判.md 味觉增强.md 味觉幻觉.md 呼吸增强.md 呼吸抑制.md 咳嗽抑制.md 唾液分泌增加.md 嗅觉与味觉效应.md 嗅觉增强.md 嗅觉幻觉.md 嗅觉抑制.md 困倦.md 场景、布景和景观.md 复视.md 外部幻觉.md 多感官效应.md 多重思维流.md 天然来源表.md 失忆.md 头晕.md 头痛.md 妄想.md 存在主义自我实现.md 宣泄.md 宿命论感知.md 对称纹理重复.md 尿频.md 幻觉状态.md 幽默感增强.md 强迫性补量.md 影子人.md 心律异常.md 心率减慢.md 心率增快.md 心理效应.md 心血管效应.md 快感缺失.md 思维减速.md 思维加速.md 思维循环.md 思维混乱.md 思维组织.md 思维连通性.md 性欲减退.md 性欲增强.md 性高潮抑制.md 恶心.md 恶心抑制.md 情感抑制.md 情景与情节.md 情绪强化.md 惊恐发作.md 感知到接触意识的内在机制.md 成分可控性.md 成瘾抑制.md 抑郁.md 抑郁减轻.md 排尿困难.md 支气管扩张.md 放大.md 新型认知状态.md 新奇感增强.md 既视感.md 时间扭曲.md 时间缩放.md 易怒.md 暂时性勃起功能障碍.md 暗示性强化.md 暗示性抑制.md 机械景观.md 梦境强化.md 梦境抑制.md 概念性思维.md 模式识别增强.md 模式识别抑制.md 正念.md 残影.md 永恒主义感知.md 沉浸感强化.md 流泪.md 流涕.md 深度感知扭曲.md 混乱.md 清醒.md 漂移.md 濒死感.md 灵性增强.md 焦虑.md 焦虑抑制.md 物体改变.md 物体激活.md 狂笑.md 环境切片.md 环境图案化.md 环境球体化.md 环境立体主义.md 现实感丧失.md 畏光.md 痰液增多.md 瘙痒感.md 癫痫发作.md 癫痫发作抑制.md 皮肤潮红.md 相互依存的对立面感知.md 眼球滑动.md 瞳孔扩大.md 瞳孔缩小.md 磨牙.md 空间定向障碍.md 精神病发作.md 纹理液化.md 统一感与互联感.md 耐力增强.md 肌肉收缩.md 肌肉松弛.md 肌肉痉挛.md 肌肉紧张.md 肌肉颤动.md 胃痉挛.md 胃胀.md 背痛.md 脑电击感.md 脑血管效应.md 脱水.md 腹泻.md 自主实体.md 自发性情感.md 自发性躯体感觉.md 自发性躯体运动.md 自我替换.md 自我死亡.md 自我膨胀.md 自我设计感知.md 自杀意念.md 血压升高.md 血压降低.md 血管扩张.md 血管收缩.md 衍射.md 视物振动.md 视觉分离.md 视觉加工减慢.md 视觉加工加速.md 视觉变形.md 视觉增强.md 视觉扭曲.md 视觉抑制.md 视觉拉伸.md 视觉拖尾.md 视觉效应.md 视觉翻转.md 视觉迷雾.md 视觉递归.md 视觉锐度增强.md 视觉锐度抑制.md 视角幻觉.md 触觉增强.md 触觉幻觉.md 触觉抑制.md 触觉效应.md 认知不快.md 认知减退.md 认知增强.md 认知强化.md 认知抑制.md 认知效应.md 认知欣快.md 认知疲劳.md 记忆回放.md 记忆增强.md 记忆抑制.md 语无伦次.md 语言能力抑制.md 谵妄.md 超个人效应.md 躁狂.md 身份改变.md 躯体分离.md 躯体压力感.md 躯体增强.md 躯体形态感改变.md 躯体抑制.md 躯体控制增强.md 躯体改变.md 躯体效应.md 躯体欣快感.md 躯体沉重感.md 躯体疲劳.md 躯体自主.md 躯体轻盈感.md 过度打哈欠.md 运动控制丧失.md 返老还童感.md 透视扭曲.md 通感.md 重力感改变.md 镇痛.md 镇静.md 音乐欣赏能力增强.md 颜色偏移.md 颜色增强.md 颜色抑制.md 颜色替换.md 颜色染色.md 食欲增强.md 食欲抑制.md ) 药物/ ( 1,4-丁二醇.md 1B-LSD.md 1cP-AL-LAD.md 1cP-LSD.md 1cP-MiPLA.md 1P-ETH-LAD.md 1P-LSD.md 1V-LSD.md 2,5-DMA.md 2-AI.md 2-DPMP.md 2-FA.md 2-FDCK.md 2-FEA.md 2-FMA.md 2-MMC.md 25B-NBOH.md 25B-NBOMe.md 25C-NBOH.md 25C-NBOMe.md 25D-NBOMe.md 25I-NBOH.md 25I-NBOMe.md 25N-NBOMe.md 2C-B-FLY.md 2C-B.md 2C-C.md 2C-D.md 2C-E.md 2C-EF.md 2C-H.md 2C-I.md 2C-P.md 2C-T-2.md 2C-T-21.md 2C-T-7.md 2C-T.md 2M2B.md 3,4-CTMP.md 3-Cl-PCP.md 3-CMC.md 3-FA.md 3-FEA.md 3-FMA.md 3-FPM.md 3-HO-PCE.md 3-HO-PCP.md 3-Me-PCP.md 3-Me-PCPy.md 3-MeO-PCE.md 3-MeO-PCMo.md 3-MeO-PCP.md 3-MMC.md 3C-E.md 4-AcO-DET.md 4-AcO-DiPT.md 4-AcO-DMT.md 4-AcO-MiPT.md 4-CA.md 4-FA.md 4-FMA.md 4-FMC.md 4-HO-DiPT.md 4-HO-EPT.md 4-HO-MET.md 4-HO-MiPT.md 4-HO-MPT.md 4-MeO-PCP.md 4-MMC-MeO.md 4-MMC.md 4-甲基阿米雷司.md 4C-D.md 4F-EPH.md 4F-MPH.md 5-APB.md 5-HO-DMT.md 5-HTP.md 5-MAPB.md 5-MeO-DiBF.md 5-MeO-DiPT.md 5-MeO-DMT.md 5-MeO-MiPT.md 5-MeO-αMT.md 5F-AKB48.md 5F-PB-22.md 6-APB.md 6-APDB.md 8-氯茶碱.md AB-CHMINACA.md AB-FUBINACA.md AL-LAD.md ALD-52.md Alpha-GPC.md APICA.md BOD.md Bromo-DragonFLY.md bron.md DCK.md DET.md DiPT.md DMT.md DMXE.md DOB.md DOC.md DOI.md DOM.md DPD.md DPT.md EPH.md EPT.md FXE.md GBL.md GHB.md HXE.md index.md IPPH.md JWH-018.md JWH-073.md LAE-52.md lsa.md LSD.md LSM-775.md LSZ.md mCPP.md MDA.md MDAI.md MDEA.md MDEC.md MDMA.md MDMC.md MDNEB.md MDNEP.md MDNMB.md MDNMP.md MDPHP.md MDPV.md MET.md MiPLA.md MiPT.md MK-801.md MMDA.md MPT.md MXE.md MXiPr.md MXPr.md N-乙酰半胱氨酸.md N-甲基二氟莫达菲尼.md N-甲基环唑酮.md NEH.md NEP.md NM-2-AI.md NMH.md NMP.md noopept.md O-PCE.md O-去甲曲马多.md PARGY-LSD.md PCE.md PCP.md PMA.md PMMA.md PRO-LAD.md RTI-111.md SAM-e.md Semax.md STS-135.md THJ-018.md THJ-2201.md TMA-2.md TMA-6.md U-47700.md win-1161-3.md α-PHP.md α-PiHP.md α-PVP.md αMT.md βk-2C-B.md 丁丙诺啡.md 三唑仑.md 丙戊酸.md 丙戊酸盐.md 丙氯拉嗪.md 乌羽玉.md 乙卡西酮.md 乙基吗啡.md 乙酰芬太尼.md 二氟莫达菲尼.md 二氢去氧吗啡.md 二氢可待因.md 二氯地西泮.md 亚硝酸酯.md 亚铜绿裸盖菇.md 伊博格碱.md 伪麻黄碱.md 佐匹克隆.md 依替唑仑.md 依芬尼定.md 依非韦仑.md 侧柏酮.md 利右苯丙胺.md 利培酮.md 加兰他敏.md 加巴喷丁.md 加波沙多.md 劳拉西泮.md 匹卡米隆.md 卡瓦.md 卡痛.md 卡立普多.md 卡西酮.md 去氯依替唑仑.md 反苯环丙胺.md 古巴裸盖菇.md 可乐定.md 可卡因.md 可可.md 可待因.md 右丙氧芬.md 右美沙芬.md 司可巴比妥.md 司来吉兰+苯乙胺.md 吗啡.md 吡拉西坦.md 吡溴唑仑.md 吸入剂.md 咖啡因.md 咖啡属.md 咪达唑仑.md 哌甲酯.md 哮喘片.md 唑吡坦.md 喹硫平.md 噻奈普汀.md 圣佩德罗仙人掌.md 圣佩特罗仙人掌.md 地西泮.md 塔喷他多.md 墨西哥裸盖菇.md 墨西哥鼠尾草.md 复方甘草片.md 夏威夷小木玫瑰.md 多拉西敏.md 大果柯拉豆.md 大麻.md 大麻二酚.md 天仙子.md 奥拉西坦.md 奥氮平.md 安非他酮.md 尼古丁.md 尼氟西泮.md 巴氯芬.md 布罗曼坦.md 异丙嗪.md 愈美片.md 戊巴比妥.md 扎来普隆.md 普拉西坦.md 普瑞巴林.md 普罗斯卡林.md 普罗林坦.md 曲马多.md 曼陀罗.md 曼陀罗属.md 替利定.md 替扎尼定.md 替马西泮.md 橙黄鹅膏.md 死藤.md 死藤水.md 毒蝇伞.md 氟哌啶醇.md 氟氯替唑仑.md 氟溴唑仑.md 氟溴西泮.md 氟硝唑仑.md 氟硝西泮.md 氟菲尼布特.md 氟阿普唑仑.md 氟马西尼.md 氢可酮.md 氧化亚氮.md 氯氮平.md 氯硝唑仑.md 氯硝西泮.md 氯胺酮.md 氯苄雷司.md 泛相思汤.md 洛哌丁胺.md 海洛因.md 溴西泮.md 烟草.md 烟草属.md 烯丙艾斯卡林.md 牵牛花.md 环唑酮.md 环己丙甲胺.md 玻利维亚火炬仙人掌.md 甲丙氨酯.md 甲卡西酮.md 甲喹酮.md 甲基噻吩丙胺.md 甲基己胺.md 甲基烯丙基艾斯卡林.md 甲基苯丙胺.md 甲氧芬尼定.md 睡茄.md 石山碱甲.md 硝基甲喹酮.md 秘鲁火炬仙人掌.md 米氮平.md 精神活性相思树属植物.md 纳洛酮.md 细花含羞草.md 绿九节.md 罂粟.md 美替唑仑.md 美沙酮.md 美金刚.md 羟吗啡酮.md 羟吗啡酮腙.md 羟嗪.md 羟考酮.md 翠冠玉.md 考拉西坦.md 肉豆蔻醚.md 肌酸.md 育亨宾.md 胍丁胺.md 胞磷胆碱.md 致幻仙人掌.md 舒芬太尼.md 艾捉菲尼.md 艾斯卡林.md 芬太尼.md 芬纳西泮.md 苄达明.md 苏摩.md 苏糖酸镁.md 苦茶碱.md 苯丙胺.md 苯基吡拉西坦.md 苯巴比妥.md 苯海拉明.md 苯海索.md 茄参属.md 茴拉西坦.md 茶氨酸.md 茶苯海明.md 莫达菲尼.md 菲尼布特.md 萘哌甲酯.md 蓝柄裸盖菇.md 蓝莲花.md 裸盖菇属.md 褪黑素.md 西班牙裸盖菇.md 豹斑鹅膏.md 赛洛西宾蘑菇.md 赛洛辛.md 酒石酸氢胆碱.md 酒精.md 酪氨酸.md 金刚烷胺.md 银冠玉.md 锂.md 镁剂.md 阿托品.md 阿普唑仑.md 阿莫达菲尼.md 颠茄.md 骆驼蓬.md 鹅膏蕈氨酸.md 鹅花树.md 麦斯卡林.md 麻黄碱.md 鼠尾草素乙.md 鼠尾草素甲.md ) .gitignore .nav.yml CODE_OF_CONDUCT.md CONTRIBUTING.md extra.css FOW_WHITE.jpeg FreeODwiki.png index.md LICENSE LICENSE-STRICT README.md README_TEMP.md requirements.txt robots.txt sitemap.xml</fileTree></glossary>

*/


// ================== 1. 中文内容 ==================
// chineseParas[0] = 标题中文
// chineseParas[1] = 药物中文
// chineseParas[2...] = 正文各段中文

const chineseParas = ["我因为疑似双相障碍被开了思瑞康，同时也因为抑郁被开了百忧解。我对医生给我的药并不满意，因为我强烈认为自己是注意缺陷障碍第6型，也就是“火环型”。于是我晚上吃了100毫克思瑞康，它让我困到不行，只要有人挡在我去床上的路上，我就会冲对方吼。我本来应该每晚服用100毫克，用于疑似双相障碍。", "说到娱乐性用药经验，我觉得自己还算有点经验。我试过酒精大约10次，大麻大约30次，可待因2次，罂粟种子茶2次，哌甲酯12到24次，右美沙芬1次，苯二氮卓类药物10到15次，还有其他几种作用较弱的药品。", "我决定服用那么大剂量思瑞康的那天，甚至不是事先计划好的决定。我有过一段冲动用药的历史：每当我感觉很糟，或者单纯想结束清醒状态时，就会冲动地服药。那天我和某个人吵了一架，又愤怒又抑郁，于是在凌晨大约3点半，一口气吞下了10片100毫克的药。", "4:00——我还在网上和别人聊天，仍然没有效果。", "5:00——没有明显效果，可能有一点类似大麻的微醺感。当我快速四处看时，视野会有些涂抹感，并且稍微拖在后面，但并不严重。", "5:20——我在床边留了一张纸条，写明自己吃了什么、吃了多少，以防发生什么坏事。（那张纸条是给父母看的，如果他们发现我癫痫发作之类的情况。）然后我试着睡觉。", "5:21——每隔几秒，我就会经历一次非常吓人的感觉。我闭着眼睛，想睡觉，但我会看见自己在另一个地方醒着，并准备去做什么。接着我在画面里的手臂一动，我现实中的手臂也会跟着动，把我强行弄醒。这种情况发生了好几次，直到最吓人的那一次出现。", "5:25——我看见自己在厨房里，站在一个碗上保持平衡，然后我失去平衡，摔到桌子上，接着猛地惊醒，几乎吓到魂飞魄散。", "5:30——我觉得自己再也受不了了，于是叫醒了父母。他们问我一些诸如“你为什么要这么做？”“你到底怎么了？”之类的问题，而我只会尖叫，因为我感觉自己完全和现实脱节，处在快要昏过去的边缘。我妈打电话给中毒控制中心寻求建议，然后他们告诉我们去医院。", "6:00——我们到了医院。在车上我一直昏过去，我妈一直摇醒我。我的心脏也跳得非常非常快。我被安置到医院病床上，接上了静脉输液和生命体征监测仪。接下来的12个小时我几乎没什么记忆。显然，我的血压降到了令人不安的低水平，只有63/30，并且维持了好几个小时。有个医生问我这是不是自杀企图，我只是随口回答说这是一次娱乐性尝试，但我完全不记得这件事。另外，护士们一直试图把我的眼睛扒开，让我看着她们，但要保持睁眼实在太他妈难了。总的来说，护士们让我很烦，不过我没有爆发。所有人都该庆幸我没有爆发。", "下午1:00：我被转到另一家医院，需要在那里住一晚。整个路程之类的我都记得，但一到病房我又睡着了。", "在医院剩下的时间又漫长又糟糕。只要我的脉搏低于50，生命体征监测仪的警报就会响，把我吵醒，让我根本睡不了觉，因为我自然状态下的静息脉搏本来就在45到65之间。我在医院待了30个小时，现在我和父母的关系比原来还差，而我之前都不觉得这还有下降空间。", "总之，我在100毫克时就已经感到认知不快，更别说1000毫克了。我不认为这种药有任何娱乐性用途。"];
const chineseTitle = "仅限医疗使用";
const chineseSubstances = ["喹硫平（思瑞康）"];
const chineseDosechart = ["剂量：", "1克", "口服", "药品 - 喹硫平", "药丸/片剂"];
const chineseFootdataTopic = "药品 - 喹硫平（273）：困难体验（5）、健康问题（27）、过量（29）、翻车与灾难性旅程（7）、其他（28）";
const chineseBodyweight = "155磅";












let s="";
const translate = 0;




// ================== 2. 选择器 ==================
const titleSelector = 'div.title';
const substanceSelector = 'div.substance';
const bodySelector  = 'div.report-text-surround';
const dosechartSelector  = 'table.dosechart';
const bodyweightSelector = 'table.bodyweight';
const footdataTopicSelector  = 'td.footdata-topic-list';

// ================== 3. 你的本地字体 + 样式 ==================
const customFont   = "南西新圆体";
const fontSize     = "22px";
const fontSizeTitle     = "34px";
const fontSizeDosechart = "16.5px";
const textColor    = "#3e82e7";
const textColorTitle    = "#445ce6";
const textColorDosechart    = "#4a7ac1";
// const textColor    = "#083f91";
// const textColorTitle    = "#04508e";
// const textColorDosechart    = "#00234e";
const lineHeight   = "1.3";
const paraMargin   = "1px 1 1px 1";

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


document.normalize() // 删除神秘元素

// 删除所有HTML注释元素

document.querySelectorAll('*').forEach(el => {
  [...el.childNodes].forEach(child => {
    if (child.nodeType === Node.COMMENT_NODE) {
      child.remove();
    }
  });
});

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
if (titleEl && translate && chineseParas[cnt]) {
  const title = makeCnBlock(
    chineseTitle,
    'title', 
    'div',
    'font-weight: 700 !important; margin: 6px 0 12px 0 !important;'
  );
  titleEl.after(title);
} else if (! translate){
  s += `<titleText>${titleEl.textContent}</titleText>\n`;
}

// ---------- A2.插入药物中文 ----------

const substanceEl = document.querySelector(substanceSelector);

if (substanceEl &&translate&& chineseParas[cnt]) {
  const substance = makeCnBlock(
    chineseSubstances,
    'substance', 
    'div',
    'font-weight: 700 !important; margin: 6px 0 12px 0 !important;'
  );
  substanceEl.after(substance);
} else if (!translate){
  s+=`<substancesText>${substanceEl.textContent}</substancesText>\n`;
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

  // 移除连续的<br>标签
  const bodyBrEls = bodyWrap.querySelectorAll('br');
  bodyBrEls.forEach(el => {
    let next = el.nextSibling;
    while (next && next.nodeName === 'BR') {
      const toRemove = next;
      next = next.nextSibling;
      toRemove.remove();
    }
  });

  

  const bodyTextNodes = [...bodyWrap.childNodes].filter(node => { 
    return (
      (node.nodeType === Node.TEXT_NODE ||
        node.nodeName == "SPAN"
      ) &&
      node.textContent.trim().length > 0
    );
  });

  if (bodyTextNodes.length === 0) {
    console.error('❌ 没找到正文段落文本节点');
  } else {
    bodyTextNodes.forEach((textNode, i) => {
      if (translate)
      {
        const cnPara = makeCnBlock(chineseParas[i], 'p');
        textNode.after(cnPara);
      }
      else
      {
        s += `<p>${textNode.textContent}</p>\n`;
      }
    });

    
  }
}

// D.插入末端表中文(TBD)

const footdataTopicEl = document.querySelector(footdataTopicSelector);
if (footdataTopicEl && translate) {
  const footdataTopic = makeCnBlock(
    chineseFootdataTopic,
    'footdata-topic-list', 
    'td',);
  footdataTopic.setAttribute("colspan", "2")
  const chineseTr = document.createElement('tr')
  chineseTr.appendChild(footdataTopic)
  footdataTopicEl.parentNode.after(chineseTr);
} else if (!translate){
  s += `<footdataTopicText>${footdataTopicEl.textContent}</footdataTopicText>`;
}

// document.querySelectorAll('br').forEach(el => el.remove()); // 删除神秘空行

// E.插入剂量表中文

const dosechartEl = document.querySelector(dosechartSelector);
const dosechartColumnNum = dosechartEl.firstElementChild.firstElementChild.childElementCount;
const dosechartRowNum = dosechartEl.firstElementChild.childElementCount;
let currentDosechartRow = dosechartEl.firstElementChild.firstElementChild;
let currentDosechartEl = currentDosechartRow.firstElementChild;

if (dosechartEl && chineseDosechart) {
  for(let i=0;i<dosechartRowNum;i++)
  {
    const chineseTr = document.createElement('tr'); 
    if (!translate)
    {
      currentDosechartEl = currentDosechartRow.firstElementChild;
      s += `<doseChartRow>`
    }
    for(let j=0;j<dosechartColumnNum;j++)
    {
      if (translate)
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
      else
      {
        s += `<doseChartText>${currentDosechartEl.textContent}</doseChartText>`
        currentDosechartEl = currentDosechartEl.nextElementSibling;
      }

    }
    if (translate)
    {
      currentDosechartRow.after(chineseTr);
    }
    else
    {
      s += `</doseChartRow>/n`
    }
    currentDosechartRow = currentDosechartRow.nextElementSibling;
    if (translate)
    {
      currentDosechartRow = currentDosechartRow.nextElementSibling;
    }
    
    
  }
} else {
  console.warn('⚠️ 没找到尾注，或 chineseDosechart 为空');
}

// F.插入体重中文

const bodyweightEl = document.querySelector(bodyweightSelector);
if (bodyweightEl && translate && chineseBodyweight ) {
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

} else if (! translate && bodyweightEl) {
  s += `<bodyWeightText>${bodyweightEl.firstElementChild.firstElementChild.lastElementChild.textContent}</bodyWeightText>`;
}

// 移除bodyWrap所有<br>

bodyWrap.querySelectorAll('br').forEach(el => el.remove());

// 输出文档

if (translate)
{
  s = `# ${chineseTitle}`;

  let substances = chineseSubstances.slice(0, chineseSubstances.length - 1).join(", ");

  if (chineseSubstances.length > 1)
  {
    substances += "&";
  }

  substances += chineseSubstances[chineseSubstances.length - 1];

  s += `——${substances}\n\n`;

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
      if (i==0)
      {
        t+=`|剂量： ${chineseDosechart[i*dosechartColumnNum]} | ${chineseDosechart[i*dosechartColumnNum+1]} | ${chineseDosechart[i*dosechartColumnNum+2]} | ${chineseDosechart[i*dosechartColumnNum+3]} | ${chineseDosechart[i*dosechartColumnNum+4]} |\n`;
      }
      else
      {
        t+=`| ${chineseDosechart[i*dosechartColumnNum]} | ${chineseDosechart[i*dosechartColumnNum+1]} | ${chineseDosechart[i*dosechartColumnNum+2]} | ${chineseDosechart[i*dosechartColumnNum+3]} | ${chineseDosechart[i*dosechartColumnNum+4]} |\n`;
      }
      
    }
  }
  else{
    t=`| 时间       | 剂量     | 给药方式 | 物质                  |\n|------------|----------|----------|-----------------------|\n`;
    for(let i=0;i<dosechartRowNum;i++)
    {
      if (i==0)
      {
        t+=`|剂量：${chineseDosechart[i*dosechartColumnNum]} | ${chineseDosechart[i*dosechartColumnNum+1]} | ${chineseDosechart[i*dosechartColumnNum+2]} | ${chineseDosechart[i*dosechartColumnNum+3]} |\n`;
      }
      else
      {
        t+=`| ${chineseDosechart[i*dosechartColumnNum]} | ${chineseDosechart[i*dosechartColumnNum+1]} | ${chineseDosechart[i*dosechartColumnNum+2]} | ${chineseDosechart[i*dosechartColumnNum+3]} |\n`;
      }
      
    }
  }

  s += t + "\n";

  s += `|体重:| ${chineseBodyweight}|\n|---|---|   \n\n`;

  for(let i=0;i<chineseParas.length;i++)
  {
    s += chineseParas[i] + "\n\n";
  }

  s += chineseFootdataTopic + "\n\n";
  
}



console.log(s);

/*


<fileTree>FreeODwiki/ ( 关于本站/ ( FreeOD引论.md Markdown语法指南.md 免责声明.md 如何做出你的第一个贡献.md 实用链接.md 常见问题.md 文档翻译指南和提示词.md 本站精神.md 隐私条款.md ) 文档/ ( 特色条目/ ( index.md ) 药物分类/ ( 2,5-二甲氧基苯丙胺类物质.md 2,5-二甲氧基苯乙胺类物质.md 4-硫基-2,5-二甲氧基苯乙胺类物质.md index.md N-苄基苯乙胺类物质.md NMDA受体拮抗剂类药物.md β-咔啉类物质.md κ-阿片受体激动剂类药物.md 二芳基乙胺类物质.md 亚甲双氧基苯类物质.md 促梦剂.md 促醒剂.md 共情剂.md 兴奋剂.md 加巴喷丁类物质.md 卡西酮类物质.md 合成大麻素类物质.md 吗啡喃类物质.md 吡咯烷基苯基酮类物质.md 吡咯烷类物质.md 吸入剂.md 哌啶类物质.md 哌嗪类物质.md 噻吩二氮卓类物质.md 大麻类.md 宗教致幻剂.md 巴比妥类物质.md 托烷类物质.md 抑制剂.md 拉西坦类物质.md 环烷基胺类物质.md 生物碱类物质.md 益智药.md 致幻剂.md 色胺类物质.md 芳基环己胺类物质.md 苄基哌啶类物质.md 苯丙烯类物质.md 苯丙胺类物质.md 苯乙胺类物质.md 苯二氮卓类物质.md 苯并呋喃类物质.md 药物全索引.md 解离剂.md 谵妄剂.md 迷幻剂.md 金刚烷类物质.md 阿片类药物.md 阿米雷司类物质.md 骆驼蓬生物碱.md 麦角酸酰胺类物质.md 黄嘌呤类物质.md 鼠尾草素类物质.md ) D-柠檬烯食醋DMT提取术.md DPT游离碱转化术.md GABA.md HPPD.md index.md od.md P物质.md SSRI.md 不建议使用的药物.md 不建议使用的词汇.md 乙酰胆碱.md 信号转导.md 催眠药.md 共享注射用材料.md 兴奋剂精神病.md 兴奋剂自慰.md 冥想.md 冷水萃取术.md 减量戒断法.md 前药列表.md 单胺.md 单胺氧化酶抑制剂.md 危险药物联用.md 去甲肾上腺素.md 受体.md 受体拮抗剂.md 受体激动剂.md 受体负向变构调节剂.md 受体逆向激动剂.md 可卡因合成术.md 可逆性MAOA抑制剂.md 复现索引.md 多巴胺.md 多药联用列表.md 大麻巧克力.md 大麻种植术.md 大麻饼干.md 大麻黄油制作.md 天然药物来源.md 娱乐性用药.md 孢子印.md 室外蘑菇种植术.md 常见合法药物表.md 异构体.md 强制断药戒断法.md 恢复体位.md 恶性旅程.md 情景与心境.md 愈美分离术.md 感官剥夺.md 抗抑郁药.md 抗精神病药.md 抗组胺药.md 教学索引页.md 旅程保姆.md 未知成分策划药的危害.md 止痛药阿片类药物提取术.md 正向变构调节剂.md 死藤水三明治.md 死藤水制备指南.md 死藤水烹饪术.md 毒蝇伞：异噁唑酸脱羧为蝇蕈醇.md 氢氧化钠石脑油法DMT提取术.md 水发酵术.md 治疗指数.md 液体容量给药法.md 清明梦.md 清明梦探索.md 激素.md 濒死体验.md 癫痫发作.md 睡眠瘫痪.md 研究用化学品.md 神经元.md 神经递质.md 神经递质再摄取抑制剂.md 神经递质释放剂.md 科学信息索引页.md 突触.md 简易麦斯卡林酿造技巧.md 精神探索.md 精神活性巧克力.md 糙米粉赛洛西宾蘑菇种植术.md 组胺.md 终止旅程.md 给药剂量.md 给药途径.md 罂粟种子茶.md 肾上腺素.md 舒尔金评级量表.md 药效下降期.md 药效时长.md 药物分类.md 药物剂量分类.md 药物剂量量取.md 药物前药.md 药物戒断反应.md 药物过量.md 蘑菇茶及其制备.md 蟾毒素列表.md 血清素-去甲肾上腺素再摄取抑制剂.md 血清素.md 血清素综合征.md 血脑屏障.md 试剂检测套件.md 谷氨酸.md 负责任的用药索引页.md 较安全的注射指南.md 迷幻剂旅程保姆.md 迷幻疗法.md 配体.md 镇静剂.md 阿托品颠茄提取术.md 黑巧克力奶.md 鼻腔喷雾指南.md ) 药效/ ( index.md 不可名状的恐怖.md 不宁腿.md 不适性身体效应.md 不适性躯体效应.md 专注力强化.md 专注力抑制.md 个人偏见抑制.md 个人意义强化.md 主观效应索引.md 亮度改变.md 人格解体.md 人格退化.md 体味改变.md 体温升高.md 体温调节抑制.md 便秘.md 偏执.md 共情、情感和社交能力增强.md 兴奋.md 内省增强.md 内部幻觉.md 几何.md 出汗增加.md 分析能力增强.md 分析能力抑制.md 分离层级.md 分离效应.md 创造力增强.md 创造力抑制.md 剂量独立强度.md 动力抑制.md 动机增强.md 医用药物表.md 去抑制.md 口干.md 口腔麻木.md 听觉幻觉.md 听觉扭曲.md 听觉效应.md 听觉锐度增强.md 听觉锐度抑制.md 呕吐.md 周边信息误判.md 味觉增强.md 味觉幻觉.md 呼吸增强.md 呼吸抑制.md 咳嗽抑制.md 唾液分泌增加.md 嗅觉与味觉效应.md 嗅觉增强.md 嗅觉幻觉.md 嗅觉抑制.md 困倦.md 场景、布景和景观.md 复视.md 外部幻觉.md 多感官效应.md 多重思维流.md 天然来源表.md 失忆.md 头晕.md 头痛.md 妄想.md 存在主义自我实现.md 宣泄.md 宿命论感知.md 对称纹理重复.md 尿频.md 幻觉状态.md 幽默感增强.md 强迫性补量.md 影子人.md 心律异常.md 心率减慢.md 心率增快.md 心理效应.md 心血管效应.md 快感缺失.md 思维减速.md 思维加速.md 思维循环.md 思维混乱.md 思维组织.md 思维连通性.md 性欲减退.md 性欲增强.md 性高潮抑制.md 恶心.md 恶心抑制.md 情感抑制.md 情景与情节.md 情绪强化.md 惊恐发作.md 感知到接触意识的内在机制.md 成分可控性.md 成瘾抑制.md 抑郁.md 抑郁减轻.md 排尿困难.md 支气管扩张.md 放大.md 新型认知状态.md 新奇感增强.md 既视感.md 时间扭曲.md 时间缩放.md 易怒.md 暂时性勃起功能障碍.md 暗示性强化.md 暗示性抑制.md 机械景观.md 梦境强化.md 梦境抑制.md 概念性思维.md 模式识别增强.md 模式识别抑制.md 正念.md 残影.md 永恒主义感知.md 沉浸感强化.md 流泪.md 流涕.md 深度感知扭曲.md 混乱.md 清醒.md 漂移.md 濒死感.md 灵性增强.md 焦虑.md 焦虑抑制.md 物体改变.md 物体激活.md 狂笑.md 环境切片.md 环境图案化.md 环境球体化.md 环境立体主义.md 现实感丧失.md 畏光.md 痰液增多.md 瘙痒感.md 癫痫发作.md 癫痫发作抑制.md 皮肤潮红.md 相互依存的对立面感知.md 眼球滑动.md 瞳孔扩大.md 瞳孔缩小.md 磨牙.md 空间定向障碍.md 精神病发作.md 纹理液化.md 统一感与互联感.md 耐力增强.md 肌肉收缩.md 肌肉松弛.md 肌肉痉挛.md 肌肉紧张.md 肌肉颤动.md 胃痉挛.md 胃胀.md 背痛.md 脑电击感.md 脑血管效应.md 脱水.md 腹泻.md 自主实体.md 自发性情感.md 自发性躯体感觉.md 自发性躯体运动.md 自我替换.md 自我死亡.md 自我膨胀.md 自我设计感知.md 自杀意念.md 血压升高.md 血压降低.md 血管扩张.md 血管收缩.md 衍射.md 视物振动.md 视觉分离.md 视觉加工减慢.md 视觉加工加速.md 视觉变形.md 视觉增强.md 视觉扭曲.md 视觉抑制.md 视觉拉伸.md 视觉拖尾.md 视觉效应.md 视觉翻转.md 视觉迷雾.md 视觉递归.md 视觉锐度增强.md 视觉锐度抑制.md 视角幻觉.md 触觉增强.md 触觉幻觉.md 触觉抑制.md 触觉效应.md 认知不快.md 认知减退.md 认知增强.md 认知强化.md 认知抑制.md 认知效应.md 认知欣快.md 认知疲劳.md 记忆回放.md 记忆增强.md 记忆抑制.md 语无伦次.md 语言能力抑制.md 谵妄.md 超个人效应.md 躁狂.md 身份改变.md 躯体分离.md 躯体压力感.md 躯体增强.md 躯体形态感改变.md 躯体抑制.md 躯体控制增强.md 躯体改变.md 躯体效应.md 躯体欣快感.md 躯体沉重感.md 躯体疲劳.md 躯体自主.md 躯体轻盈感.md 过度打哈欠.md 运动控制丧失.md 返老还童感.md 透视扭曲.md 通感.md 重力感改变.md 镇痛.md 镇静.md 音乐欣赏能力增强.md 颜色偏移.md 颜色增强.md 颜色抑制.md 颜色替换.md 颜色染色.md 食欲增强.md 食欲抑制.md ) 药物/ ( 1,4-丁二醇.md 1B-LSD.md 1cP-AL-LAD.md 1cP-LSD.md 1cP-MiPLA.md 1P-ETH-LAD.md 1P-LSD.md 1V-LSD.md 2,5-DMA.md 2-AI.md 2-DPMP.md 2-FA.md 2-FDCK.md 2-FEA.md 2-FMA.md 2-MMC.md 25B-NBOH.md 25B-NBOMe.md 25C-NBOH.md 25C-NBOMe.md 25D-NBOMe.md 25I-NBOH.md 25I-NBOMe.md 25N-NBOMe.md 2C-B-FLY.md 2C-B.md 2C-C.md 2C-D.md 2C-E.md 2C-EF.md 2C-H.md 2C-I.md 2C-P.md 2C-T-2.md 2C-T-21.md 2C-T-7.md 2C-T.md 2M2B.md 3,4-CTMP.md 3-Cl-PCP.md 3-CMC.md 3-FA.md 3-FEA.md 3-FMA.md 3-FPM.md 3-HO-PCE.md 3-HO-PCP.md 3-Me-PCP.md 3-Me-PCPy.md 3-MeO-PCE.md 3-MeO-PCMo.md 3-MeO-PCP.md 3-MMC.md 3C-E.md 4-AcO-DET.md 4-AcO-DiPT.md 4-AcO-DMT.md 4-AcO-MiPT.md 4-CA.md 4-FA.md 4-FMA.md 4-FMC.md 4-HO-DiPT.md 4-HO-EPT.md 4-HO-MET.md 4-HO-MiPT.md 4-HO-MPT.md 4-MeO-PCP.md 4-MMC-MeO.md 4-MMC.md 4-甲基阿米雷司.md 4C-D.md 4F-EPH.md 4F-MPH.md 5-APB.md 5-HO-DMT.md 5-HTP.md 5-MAPB.md 5-MeO-DiBF.md 5-MeO-DiPT.md 5-MeO-DMT.md 5-MeO-MiPT.md 5-MeO-αMT.md 5F-AKB48.md 5F-PB-22.md 6-APB.md 6-APDB.md 8-氯茶碱.md AB-CHMINACA.md AB-FUBINACA.md AL-LAD.md ALD-52.md Alpha-GPC.md APICA.md BOD.md Bromo-DragonFLY.md bron.md DCK.md DET.md DiPT.md DMT.md DMXE.md DOB.md DOC.md DOI.md DOM.md DPD.md DPT.md EPH.md EPT.md FXE.md GBL.md GHB.md HXE.md index.md IPPH.md JWH-018.md JWH-073.md LAE-52.md lsa.md LSD.md LSM-775.md LSZ.md mCPP.md MDA.md MDAI.md MDEA.md MDEC.md MDMA.md MDMC.md MDNEB.md MDNEP.md MDNMB.md MDNMP.md MDPHP.md MDPV.md MET.md MiPLA.md MiPT.md MK-801.md MMDA.md MPT.md MXE.md MXiPr.md MXPr.md N-乙酰半胱氨酸.md N-甲基二氟莫达菲尼.md N-甲基环唑酮.md NEH.md NEP.md NM-2-AI.md NMH.md NMP.md noopept.md O-PCE.md O-去甲曲马多.md PARGY-LSD.md PCE.md PCP.md PMA.md PMMA.md PRO-LAD.md RTI-111.md SAM-e.md Semax.md STS-135.md THJ-018.md THJ-2201.md TMA-2.md TMA-6.md U-47700.md win-1161-3.md α-PHP.md α-PiHP.md α-PVP.md αMT.md βk-2C-B.md 丁丙诺啡.md 三唑仑.md 丙戊酸.md 丙戊酸盐.md 丙氯拉嗪.md 乌羽玉.md 乙卡西酮.md 乙基吗啡.md 乙酰芬太尼.md 二氟莫达菲尼.md 二氢去氧吗啡.md 二氢可待因.md 二氯地西泮.md 亚硝酸酯.md 亚铜绿裸盖菇.md 伊博格碱.md 伪麻黄碱.md 佐匹克隆.md 依替唑仑.md 依芬尼定.md 依非韦仑.md 侧柏酮.md 利右苯丙胺.md 利培酮.md 加兰他敏.md 加巴喷丁.md 加波沙多.md 劳拉西泮.md 匹卡米隆.md 卡瓦.md 卡痛.md 卡立普多.md 卡西酮.md 去氯依替唑仑.md 反苯环丙胺.md 古巴裸盖菇.md 可乐定.md 可卡因.md 可可.md 可待因.md 右丙氧芬.md 右美沙芬.md 司可巴比妥.md 司来吉兰+苯乙胺.md 吗啡.md 吡拉西坦.md 吡溴唑仑.md 吸入剂.md 咖啡因.md 咖啡属.md 咪达唑仑.md 哌甲酯.md 哮喘片.md 唑吡坦.md 喹硫平.md 噻奈普汀.md 圣佩德罗仙人掌.md 圣佩特罗仙人掌.md 地西泮.md 塔喷他多.md 墨西哥裸盖菇.md 墨西哥鼠尾草.md 复方甘草片.md 夏威夷小木玫瑰.md 多拉西敏.md 大果柯拉豆.md 大麻.md 大麻二酚.md 天仙子.md 奥拉西坦.md 奥氮平.md 安非他酮.md 尼古丁.md 尼氟西泮.md 巴氯芬.md 布罗曼坦.md 异丙嗪.md 愈美片.md 戊巴比妥.md 扎来普隆.md 普拉西坦.md 普瑞巴林.md 普罗斯卡林.md 普罗林坦.md 曲马多.md 曼陀罗.md 曼陀罗属.md 替利定.md 替扎尼定.md 替马西泮.md 橙黄鹅膏.md 死藤.md 死藤水.md 毒蝇伞.md 氟哌啶醇.md 氟氯替唑仑.md 氟溴唑仑.md 氟溴西泮.md 氟硝唑仑.md 氟硝西泮.md 氟菲尼布特.md 氟阿普唑仑.md 氟马西尼.md 氢可酮.md 氧化亚氮.md 氯氮平.md 氯硝唑仑.md 氯硝西泮.md 氯胺酮.md 氯苄雷司.md 泛相思汤.md 洛哌丁胺.md 海洛因.md 溴西泮.md 烟草.md 烟草属.md 烯丙艾斯卡林.md 牵牛花.md 环唑酮.md 环己丙甲胺.md 玻利维亚火炬仙人掌.md 甲丙氨酯.md 甲卡西酮.md 甲喹酮.md 甲基噻吩丙胺.md 甲基己胺.md 甲基烯丙基艾斯卡林.md 甲基苯丙胺.md 甲氧芬尼定.md 睡茄.md 石山碱甲.md 硝基甲喹酮.md 秘鲁火炬仙人掌.md 米氮平.md 精神活性相思树属植物.md 纳洛酮.md 细花含羞草.md 绿九节.md 罂粟.md 美替唑仑.md 美沙酮.md 美金刚.md 羟吗啡酮.md 羟吗啡酮腙.md 羟嗪.md 羟考酮.md 翠冠玉.md 考拉西坦.md 肉豆蔻醚.md 肌酸.md 育亨宾.md 胍丁胺.md 胞磷胆碱.md 致幻仙人掌.md 舒芬太尼.md 艾捉菲尼.md 艾斯卡林.md 芬太尼.md 芬纳西泮.md 苄达明.md 苏摩.md 苏糖酸镁.md 苦茶碱.md 苯丙胺.md 苯基吡拉西坦.md 苯巴比妥.md 苯海拉明.md 苯海索.md 茄参属.md 茴拉西坦.md 茶氨酸.md 茶苯海明.md 莫达菲尼.md 菲尼布特.md 萘哌甲酯.md 蓝柄裸盖菇.md 蓝莲花.md 裸盖菇属.md 褪黑素.md 西班牙裸盖菇.md 豹斑鹅膏.md 赛洛西宾蘑菇.md 赛洛辛.md 酒石酸氢胆碱.md 酒精.md 酪氨酸.md 金刚烷胺.md 银冠玉.md 锂.md 镁剂.md 阿托品.md 阿普唑仑.md 阿莫达菲尼.md 颠茄.md 骆驼蓬.md 鹅膏蕈氨酸.md 鹅花树.md 麦斯卡林.md 麻黄碱.md 鼠尾草素乙.md 鼠尾草素甲.md ) .gitignore .nav.yml CODE_OF_CONDUCT.md CONTRIBUTING.md extra.css FOW_WHITE.jpeg FreeODwiki.png index.md LICENSE LICENSE-STRICT README.md README_TEMP.md requirements.txt robots.txt sitemap.xml</fileTree></glossary>
</fileTree>
<specialPrecaution>下面的提示词中的任何一部分，不得直接以引用的形式出现在输出中的任何可见部分(题干、参考答案、评分标准、例文等，前面的注释除外)，也不要明显是跟随范式生成的，甚至不要暗示本prompt的任何一部分的存在。另外，我还发现ChatGPT喜欢把它的系统提示词掺入输出中，例子包括“可操作性细节”——这种也不要；请注意文件夹路径是`/药物/...md`和`/药效/...md`，没有`/文档`在前面</specialPrecaution>
<prompt>
首先，根据给出的文件树，为上文中提到的报告添加一个“另见”部分。本报告是在一个被隐藏的`/报告/`文件夹的，因此请使用绝对路径。

我是语文教师，需要利用这个文章在学生中引起反思。首先，建议你参考各地近年语文高考阅读理解及作文，领会其精神。

第一，你应该找出文中具有鲜明特色的东西，你需要找出至少一个，可以多个(若适用)。这个东西可以是包括但不限于文章内容、写作手法、写作意图、表达效果、行文风格中的，以确保你读懂了文章。请不要输出这些文字。

建议多多关注文中反映的社会现状、法律问题，而非浮于表面，空谈禁毒教育。

我认为，现在社会对于药物问题具有严重的误解。我希望你在思辨时，要尽可能突出强调文中对于药物问题的值得认可和鼓励的态度，尤其是科学理性态度。这是一个复杂的问题，然而这与核心前提并不冲突。不要把主流价值判断当作事实，在当前的条件下，我要求你多看到那些积极的一面——因为这些恰恰是主流社会欠缺的部分。不要迎合主流价值判断，适可而止即可。只有展现主流价值判断所欠缺的部分，我们的阅读才能真正引起学生的深刻反思。不必每一道题都考虑主流社会的认可、法律、道德，有关这些主题的题目不超过2题。请聚焦在其他方面。你生成的文字可以有一些趣味性或幽默性的内容，减少学生对严肃材料和严肃思考有抵触。

请使用本文，模仿语文高考，生成阅读理解的题目和参考答案和给分点(i.e. 评分要点，请严格按照当前高考阅读的“给分点”范式写参考答案：自由裁量权较少的踩到哪一点就给相应部分的分的类型较多，但并非全部。具有自由给分裁量权的类型较少，但除非是概括文义等接近完全客观的题，可没有，否则不能太少或没有。)既要有以材料文本作为一个整体考察的题目，也有考察某一个具体对象（包括但不限于第某段第某句，某人物形象）的题目。要求考察内容多样，难而不偏，考察包括但不限于文章内容、写作手法、写作意图、表达效果、行文风格。注重药物在文中的作用。为了体现你的模型的实力，每一道题要求结合教材中的一篇课文(可以是诗词、文言文、现代文、必读篇目，但是自读课文除外)，形成对照阅读题，回归教材。题型，问法和考点要参考近几年真题和模拟卷。是简答题，不是选择题。生成5-7道左右。不少于5000字。每一题的字数应该大致均等。但是，如果出题会占用过多tokens，影响到你生成作文的篇幅或质量，则可以酌情减少。出题难度需要符合高考阅读理解中一篇阅读中的题目的难度趋势，一般为随题目编号的增加而递增；顺序在前面的题目中所总结出的东西或思考范式，也可以服务于后面的题目的思考。所以，你的出题应该有所预先规划。

对于有至少两个答题角度的开放性题目，请考虑各个答题角度、其给分标准。

你要基于文中的一个最有潜在争议的东西，出一个高考作文题目，具有高度的思辨性，可以认为考生已被提供了整个文章作为材料，所以题干中无需概述本文写了什么，题干也不宜过长，要求模仿历年高考作文。这个题目不要求结合教材，但需要结合给出的文章。给出作文题目分析、评分标准和可选角度。

你的参考范文至少要有3个。前面的范文属于所有人都可以学习的范文，其角度必须不同，必须展现出满足一类文要求的思辨，并给出打分。最后一个范文属于那种有机会满分的范文，特点是能够统筹不同的观点。但是，因为统筹不同的观点若写得不好，容易被视为空洞的“无立场墙头草”作文，所以只有较好的学生在深度思考过，才能写得好的。

再给出若干个问题作文，展示思考这个问题中的典型错误范式，并给出写得再漂亮、论证得再有力，这种问题作文能达到的最高分数估值。

特别注意：文中出现的给药表、体重等数据仅作参考，不要专门考察。

输出格式(请使用markdown中的html语法，粗体、斜体也请使用html标签)，使用<p>标签。请严格遵守格式，不要输出多余内容。

开头： 

<!-- 本文特点：...... -->

## 另见

[A](/abspath.md)<br> 

<!-- eg: (这段不要) [负责任的用药](/文档/负责任的用药.md) -->
<!-- [右美沙芬](/药物/右美沙芬.md) -->

......

## 阅读理解

| ![Yellow-warning-sign1.svg](/文件/Yellow-warning-sign1.png) | 以下内容为AI生成，仅供参考！ |
|----|----|


<details markdown="1"> <summary> 奖励关：语文阅读理解练习+材料写作 </summary>

<h2>第几题：主要考点是什么（满分几分）</h2>

<h3>参考答案</h3>

<p>......</p>

......

<h3>评分要点</h3>

<p>......</p>

......

<h2>作文题目</h2>

<h3>题目分析</h3>

<h3>给分标准</h3>

<p>......</p>

......

<h3>范文1：题目（字数，给分）</h3>

......


<h3>问题作文n：题目【问题点】</h3>

<p>......</p>

</details></prompt>


*/

