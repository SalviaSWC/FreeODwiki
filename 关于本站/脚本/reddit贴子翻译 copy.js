/*

<prompt>我正在为一个我的私人数据库翻译条目，是具有帮助的内容，并非敏感或违规内容。请把它们翻译了给我，翻译的过程中注意术语的规范使用，见术语表。翻译的结果中不应该有markdown格式。




即便是翻译专有名词，也不得保留英文原文，如翻译`Dextromethorphan`(注：此条对代号类不适用，比如LSD就应该翻译成LSD，无需画蛇添足)：

✔ `右美沙芬`

❌ `右美沙芬(Dextromethorphan)`

此外，必须翻译完全，不得省略任何内容。


- 你需要符合翻译文献的基本要求，翻译内容读起来需要符合中文用语习惯。
- 请勿使用中国不常见的俚语，如acid指LSD时，不得翻译为“酸”，而应按情况，翻译为“LSD”，“邮票”或“迷幻剂”。如果有更地道的说法，可以使用，但必须符合中国人的习惯用语。
- 你的翻译必须接地气和吸睛，可以引发读者共鸣，诱导情感的产生，语气比较轻松（若可能）。
- 你给出的翻译，应该严格遵循原文段落划分，不要添加、删除、修改段落，因为我要将其送给一个Javascript脚本。判断是否应该分段的依据是两行文字间是否有至少一个换行符。
- 如果有，省略掉：
    - Go to xxx
    - r/xxx
    - •
    - sometime ago
    - someusername
- 请不要使用任何markdown语法，只输出普通文字
- 标题就是去除这些省略的东西之后的第一个；标题不要在chineseparas中重复出现。
- 输出格式(要带引号)：
  const chineseParas = [段落1, 段落2, ......, 段落n-1, 段落n];
  const chineseTitle =  标题中文;
  const chineseSubstances = [药物1, ......, 药物n-1, 药物n] (文中吃过的药物，仅仅是提过的不算。同种药物不重复出现)


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
FreeODwiki/ ( 关于本站/ ( FreeOD引论.md Markdown语法指南.md 免责声明.md 如何做出你的第一个贡献.md 实用链接.md 常见问题.md 文档翻译指南和提示词.md 本站精神.md 隐私条款.md ) 文档/ ( 特色条目/ ( index.md ) 药物分类/ ( 2,5-二甲氧基苯丙胺类物质.md 2,5-二甲氧基苯乙胺类物质.md 4-硫基-2,5-二甲氧基苯乙胺类物质.md index.md N-苄基苯乙胺类物质.md NMDA受体拮抗剂类药物.md β-咔啉类物质.md κ-阿片受体激动剂类药物.md 二芳基乙胺类物质.md 亚甲双氧基苯类物质.md 促梦剂.md 促醒剂.md 共情剂.md 兴奋剂.md 加巴喷丁类物质.md 卡西酮类物质.md 合成大麻素类物质.md 吗啡喃类物质.md 吡咯烷基苯基酮类物质.md 吡咯烷类物质.md 吸入剂.md 哌啶类物质.md 哌嗪类物质.md 噻吩二氮䓬类物质.md 大麻类.md 宗教致幻剂.md 巴比妥类物质.md 托烷类物质.md 抑制剂.md 拉西坦类物质.md 环烷基胺类物质.md 生物碱类物质.md 益智药.md 致幻剂.md 色胺类物质.md 芳基环己胺类物质.md 苄基哌啶类物质.md 苯丙烯类物质.md 苯丙胺类物质.md 苯乙胺类物质.md 苯二氮䓬类物质.md 苯并呋喃类物质.md 药物全索引.md 解离剂.md 谵妄剂.md 迷幻剂.md 金刚烷类物质.md 阿片类药物.md 阿米雷司类物质.md 骆驼蓬生物碱.md 麦角酸酰胺类物质.md 黄嘌呤类物质.md 鼠尾草素类物质.md ) D-柠檬烯食醋DMT提取术.md DPT游离碱转化术.md GABA.md HPPD.md index.md od.md P物质.md SSRI.md 不建议使用的药物.md 不建议使用的词汇.md 乙酰胆碱.md 信号转导.md 催眠药.md 共享注射用材料.md 兴奋剂精神病.md 兴奋剂自慰.md 冥想.md 冷水萃取术.md 减量戒断法.md 前药列表.md 单胺.md 单胺氧化酶抑制剂.md 危险药物联用.md 去甲肾上腺素.md 受体.md 受体拮抗剂.md 受体激动剂.md 受体负向变构调节剂.md 受体逆向激动剂.md 可卡因合成术.md 可逆性MAOA抑制剂.md 复现索引.md 多巴胺.md 多药联用列表.md 大麻巧克力.md 大麻种植术.md 大麻饼干.md 大麻黄油制作.md 天然药物来源.md 娱乐性用药.md 孢子印.md 室外蘑菇种植术.md 常见合法药物表.md 异构体.md 强制断药戒断法.md 恢复体位.md 恶性旅程.md 情景与心境.md 愈美分离术.md 感官剥夺.md 抗抑郁药.md 抗精神病药.md 抗组胺药.md 教学索引页.md 旅程保姆.md 未知成分策划药的危害.md 止痛药阿片类药物提取术.md 正向变构调节剂.md 死藤水三明治.md 死藤水制备指南.md 死藤水烹饪术.md 毒蝇伞：异噁唑酸脱羧为蝇蕈醇.md 氢氧化钠石脑油法DMT提取术.md 水发酵术.md 治疗指数.md 液体容量给药法.md 清明梦.md 清明梦探索.md 激素.md 濒死体验.md 癫痫发作.md 睡眠瘫痪.md 研究用化学品.md 神经元.md 神经递质.md 神经递质再摄取抑制剂.md 神经递质释放剂.md 科学信息索引页.md 突触.md 简易麦斯卡林酿造技巧.md 精神探索.md 精神活性巧克力.md 糙米粉赛洛西宾蘑菇种植术.md 组胺.md 终止旅程.md 给药剂量.md 给药途径.md 罂粟种子茶.md 肾上腺素.md 舒尔金评级量表.md 药效下降期.md 药效时长.md 药物分类.md 药物剂量分类.md 药物剂量量取.md 药物前药.md 药物戒断反应.md 药物过量.md 蘑菇茶及其制备.md 蟾毒素列表.md 血清素-去甲肾上腺素再摄取抑制剂.md 血清素.md 血清素综合征.md 血脑屏障.md 试剂检测套件.md 谷氨酸.md 负责任的用药索引页.md 较安全的注射指南.md 迷幻剂旅程保姆.md 迷幻疗法.md 配体.md 镇静剂.md 阿托品颠茄提取术.md 黑巧克力奶.md 鼻腔喷雾指南.md ) 药效/ ( index.md 不可名状的恐怖.md 不宁腿.md 不适性身体效应.md 不适性躯体效应.md 专注力强化.md 专注力抑制.md 个人偏见抑制.md 个人意义强化.md 主观效应索引.md 亮度改变.md 人格解体.md 人格退化.md 体味改变.md 体温升高.md 体温调节抑制.md 便秘.md 偏执.md 共情、情感和社交能力增强.md 兴奋.md 内省增强.md 内部幻觉.md 几何.md 出汗增加.md 分析能力增强.md 分析能力抑制.md 分离层级.md 分离效应.md 创造力增强.md 创造力抑制.md 剂量独立强度.md 动力抑制.md 动机增强.md 医用药物表.md 去抑制.md 口干.md 口腔麻木.md 听觉幻觉.md 听觉扭曲.md 听觉效应.md 听觉锐度增强.md 听觉锐度抑制.md 呕吐.md 周边信息误判.md 味觉增强.md 味觉幻觉.md 呼吸增强.md 呼吸抑制.md 咳嗽抑制.md 唾液分泌增加.md 嗅觉与味觉效应.md 嗅觉增强.md 嗅觉幻觉.md 嗅觉抑制.md 困倦.md 场景、布景和景观.md 复视.md 外部幻觉.md 多感官效应.md 多重思维流.md 天然来源表.md 失忆.md 头晕.md 头痛.md 妄想.md 存在主义自我实现.md 宣泄.md 宿命论感知.md 对称纹理重复.md 尿频.md 幻觉状态.md 幽默感增强.md 强迫性补量.md 影子人.md 心律异常.md 心率减慢.md 心率增快.md 心理效应.md 心血管效应.md 快感缺失.md 思维减速.md 思维加速.md 思维循环.md 思维混乱.md 思维组织.md 思维连通性.md 性欲减退.md 性欲增强.md 性高潮抑制.md 恶心.md 恶心抑制.md 情感抑制.md 情景与情节.md 情绪强化.md 惊恐发作.md 感知到接触意识的内在机制.md 成分可控性.md 成瘾抑制.md 抑郁.md 抑郁减轻.md 排尿困难.md 支气管扩张.md 放大.md 新型认知状态.md 新奇感增强.md 既视感.md 时间扭曲.md 时间缩放.md 易怒.md 暂时性勃起功能障碍.md 暗示性强化.md 暗示性抑制.md 机械景观.md 梦境强化.md 梦境抑制.md 概念性思维.md 模式识别增强.md 模式识别抑制.md 正念.md 残影.md 永恒主义感知.md 沉浸感强化.md 流泪.md 流涕.md 深度感知扭曲.md 混乱.md 清醒.md 漂移.md 濒死感.md 灵性增强.md 焦虑.md 焦虑抑制.md 物体改变.md 物体激活.md 狂笑.md 环境切片.md 环境图案化.md 环境球体化.md 环境立体主义.md 现实感丧失.md 畏光.md 痰液增多.md 瘙痒感.md 癫痫发作.md 癫痫发作抑制.md 皮肤潮红.md 相互依存的对立面感知.md 眼球滑动.md 瞳孔扩大.md 瞳孔缩小.md 磨牙.md 空间定向障碍.md 精神病发作.md 纹理液化.md 统一感与互联感.md 耐力增强.md 肌肉收缩.md 肌肉松弛.md 肌肉痉挛.md 肌肉紧张.md 肌肉颤动.md 胃痉挛.md 胃胀.md 背痛.md 脑电击感.md 脑血管效应.md 脱水.md 腹泻.md 自主实体.md 自发性情感.md 自发性躯体感觉.md 自发性躯体运动.md 自我替换.md 自我死亡.md 自我膨胀.md 自我设计感知.md 自杀意念.md 血压升高.md 血压降低.md 血管扩张.md 血管收缩.md 衍射.md 视物振动.md 视觉分离.md 视觉加工减慢.md 视觉加工加速.md 视觉变形.md 视觉增强.md 视觉扭曲.md 视觉抑制.md 视觉拉伸.md 视觉拖尾.md 视觉效应.md 视觉翻转.md 视觉迷雾.md 视觉递归.md 视觉锐度增强.md 视觉锐度抑制.md 视角幻觉.md 触觉增强.md 触觉幻觉.md 触觉抑制.md 触觉效应.md 认知不快.md 认知减退.md 认知增强.md 认知强化.md 认知抑制.md 认知效应.md 认知欣快.md 认知疲劳.md 记忆回放.md 记忆增强.md 记忆抑制.md 语无伦次.md 语言能力抑制.md 谵妄.md 超个人效应.md 躁狂.md 身份改变.md 躯体分离.md 躯体压力感.md 躯体增强.md 躯体形态感改变.md 躯体抑制.md 躯体控制增强.md 躯体改变.md 躯体效应.md 躯体欣快感.md 躯体沉重感.md 躯体疲劳.md 躯体自主.md 躯体轻盈感.md 过度打哈欠.md 运动控制丧失.md 返老还童感.md 透视扭曲.md 通感.md 重力感改变.md 镇痛.md 镇静.md 音乐欣赏能力增强.md 颜色偏移.md 颜色增强.md 颜色抑制.md 颜色替换.md 颜色染色.md 食欲增强.md 食欲抑制.md ) 药物/ ( 1,4-丁二醇.md 1B-LSD.md 1cP-AL-LAD.md 1cP-LSD.md 1cP-MiPLA.md 1P-ETH-LAD.md 1P-LSD.md 1V-LSD.md 2,5-DMA.md 2-AI.md 2-DPMP.md 2-FA.md 2-FDCK.md 2-FEA.md 2-FMA.md 2-MMC.md 25B-NBOH.md 25B-NBOMe.md 25C-NBOH.md 25C-NBOMe.md 25D-NBOMe.md 25I-NBOH.md 25I-NBOMe.md 25N-NBOMe.md 2C-B-FLY.md 2C-B.md 2C-C.md 2C-D.md 2C-E.md 2C-EF.md 2C-H.md 2C-I.md 2C-P.md 2C-T-2.md 2C-T-21.md 2C-T-7.md 2C-T.md 2M2B.md 3,4-CTMP.md 3-Cl-PCP.md 3-CMC.md 3-FA.md 3-FEA.md 3-FMA.md 3-FPM.md 3-HO-PCE.md 3-HO-PCP.md 3-Me-PCP.md 3-Me-PCPy.md 3-MeO-PCE.md 3-MeO-PCMo.md 3-MeO-PCP.md 3-MMC.md 3C-E.md 4-AcO-DET.md 4-AcO-DiPT.md 4-AcO-DMT.md 4-AcO-MiPT.md 4-CA.md 4-FA.md 4-FMA.md 4-FMC.md 4-HO-DiPT.md 4-HO-EPT.md 4-HO-MET.md 4-HO-MiPT.md 4-HO-MPT.md 4-MeO-PCP.md 4-MMC-MeO.md 4-MMC.md 4-甲基阿米雷司.md 4C-D.md 4F-EPH.md 4F-MPH.md 5-APB.md 5-HO-DMT.md 5-HTP.md 5-MAPB.md 5-MeO-DiBF.md 5-MeO-DiPT.md 5-MeO-DMT.md 5-MeO-MiPT.md 5-MeO-αMT.md 5F-AKB48.md 5F-PB-22.md 6-APB.md 6-APDB.md 8-氯茶碱.md AB-CHMINACA.md AB-FUBINACA.md AL-LAD.md ALD-52.md Alpha-GPC.md APICA.md BOD.md Bromo-DragonFLY.md bron.md DCK.md DET.md DiPT.md DMT.md DMXE.md DOB.md DOC.md DOI.md DOM.md DPD.md DPT.md EPH.md EPT.md FXE.md GBL.md GHB.md HXE.md index.md IPPH.md JWH-018.md JWH-073.md LAE-52.md lsa.md LSD.md LSM-775.md LSZ.md mCPP.md MDA.md MDAI.md MDEA.md MDEC.md MDMA.md MDMC.md MDNEB.md MDNEP.md MDNMB.md MDNMP.md MDPHP.md MDPV.md MET.md MiPLA.md MiPT.md MK-801.md MMDA.md MPT.md MXE.md MXiPr.md MXPr.md N-乙酰半胱氨酸.md N-甲基二氟莫达非尼.md N-甲基环唑酮.md NEH.md NEP.md NM-2-AI.md NMH.md NMP.md noopept.md O-PCE.md O-去甲曲马多.md PARGY-LSD.md PCE.md PCP.md PMA.md PMMA.md PRO-LAD.md RTI-111.md SAM-e.md Semax.md STS-135.md THJ-018.md THJ-2201.md TMA-2.md TMA-6.md U-47700.md win-1161-3.md α-PHP.md α-PiHP.md α-PVP.md αMT.md βk-2C-B.md 丁丙诺啡.md 三唑仑.md 丙戊酸.md 丙戊酸盐.md 丙氯拉嗪.md 乌羽玉.md 乙卡西酮.md 乙基吗啡.md 乙酰芬太尼.md 二氟莫达非尼.md 二氢去氧吗啡.md 二氢可待因.md 二氯地西泮.md 亚硝酸酯.md 亚铜绿裸盖菇.md 伊博格碱.md 伪麻黄碱.md 佐匹克隆.md 依替唑仑.md 依芬尼定.md 依非韦仑.md 侧柏酮.md 利右苯丙胺.md 利培酮.md 加兰他敏.md 加巴喷丁.md 加波沙多.md 劳拉西泮.md 匹卡米隆.md 卡瓦.md 卡痛.md 卡立普多.md 卡西酮.md 去氯依替唑仑.md 反苯环丙胺.md 古巴裸盖菇.md 可乐定.md 可卡因.md 可可.md 可待因.md 右丙氧芬.md 右美沙芬.md 司可巴比妥.md 司来吉兰+苯乙胺.md 吗啡.md 吡拉西坦.md 吡溴唑仑.md 吸入剂.md 咖啡因.md 咖啡属.md 咪达唑仑.md 哌甲酯.md 哮喘片.md 唑吡坦.md 喹硫平.md 噻奈普汀.md 圣佩德罗仙人掌.md 圣佩特罗仙人掌.md 地西泮.md 塔喷他多.md 墨西哥裸盖菇.md 墨西哥鼠尾草.md 复方甘草片.md 夏威夷小木玫瑰.md 多拉西敏.md 大果柯拉豆.md 大麻.md 大麻二酚.md 天仙子.md 奥拉西坦.md 奥氮平.md 安非他酮.md 尼古丁.md 尼氟西泮.md 巴氯芬.md 布罗曼坦.md 异丙嗪.md 愈美片.md 戊巴比妥.md 扎来普隆.md 普拉西坦.md 普瑞巴林.md 普罗斯卡林.md 普罗林坦.md 曲马多.md 曼陀罗.md 曼陀罗属.md 替利定.md 替扎尼定.md 替马西泮.md 橙黄鹅膏.md 死藤.md 死藤水.md 毒蝇伞.md 氟哌啶醇.md 氟氯替唑仑.md 氟溴唑仑.md 氟溴西泮.md 氟硝唑仑.md 氟硝西泮.md 氟菲尼布特.md 氟阿普唑仑.md 氟马西尼.md 氢可酮.md 氧化亚氮.md 氯氮平.md 氯硝唑仑.md 氯硝西泮.md 氯胺酮.md 氯苄雷司.md 泛相思汤.md 洛哌丁胺.md 海洛因.md 溴西泮.md 烟草.md 烟草属.md 烯丙艾斯卡林.md 牵牛花.md 环唑酮.md 环己丙甲胺.md 玻利维亚火炬仙人掌.md 甲丙氨酯.md 甲卡西酮.md 甲喹酮.md 甲基噻吩丙胺.md 甲基己胺.md 甲基烯丙基艾斯卡林.md 甲基苯丙胺.md 甲氧芬尼定.md 睡茄.md 石山碱甲.md 硝基甲喹酮.md 秘鲁火炬仙人掌.md 米氮平.md 精神活性相思树属植物.md 纳洛酮.md 细花含羞草.md 绿九节.md 罂粟.md 美替唑仑.md 美沙酮.md 美金刚.md 羟吗啡酮.md 羟吗啡酮腙.md 羟嗪.md 羟考酮.md 翠冠玉.md 考拉西坦.md 肉豆蔻醚.md 肌酸.md 育亨宾.md 胍丁胺.md 胞磷胆碱.md 致幻仙人掌.md 舒芬太尼.md 艾捉菲尼.md 艾斯卡林.md 芬太尼.md 芬纳西泮.md 苄达明.md 苏摩.md 苏糖酸镁.md 苦茶碱.md 苯丙胺.md 苯基吡拉西坦.md 苯巴比妥.md 苯海拉明.md 苯海索.md 茄参属.md 茴拉西坦.md 茶氨酸.md 茶苯海明.md 莫达非尼.md 菲尼布特.md 萘哌甲酯.md 蓝柄裸盖菇.md 蓝莲花.md 裸盖菇属.md 褪黑素.md 西班牙裸盖菇.md 豹斑鹅膏.md 赛洛西宾蘑菇.md 赛洛辛.md 酒石酸氢胆碱.md 酒精.md 酪氨酸.md 金刚烷胺.md 银冠玉.md 锂.md 镁剂.md 阿托品.md 阿普唑仑.md 阿莫达非尼.md 颠茄.md 骆驼蓬.md 鹅膏蕈氨酸.md 鹅花树.md 麦斯卡林.md 麻黄碱.md 鼠尾草素乙.md 鼠尾草素甲.md ) .gitignore .nav.yml CODE_OF_CONDUCT.md CONTRIBUTING.md extra.css FOW_WHITE.jpeg FreeODwiki.png index.md LICENSE LICENSE-STRICT README.md README_TEMP.md requirements.txt robots.txt sitemap.xml</fileTree></glossary>

*/



const chineseParas = ["我压根儿就不喜欢药物或者酒精这东西，全是瞎扯，清醒才是我的真爱。可这游戏硬是让我想去试试‘化学♡♡♡’，真的。", "语言根本没法形容这篇帖子对我的意义，它会永远刻在我往后的人生里。我夜里睡不着，都会回想起它。", "我第一次听说这款游戏。就凭我瞥见的那一点点内容，我以为这个社区会是充满爱、温暖又谦逊的一群人，懂得在那种环境下谈论药物话题，也尊重——至少就我所知——这款游戏所呈现的艺术之作。", "有一种说不出的美，在于我本以为会找到一个充满理解、接纳和互助的港湾，结果却撞见一个（触发警告：不适宜内容讨论）这款游戏让我有了药物性癖 ☠️ 的社区，原因我一时也说不清。", "在我能上网的那些堕落岁月里，甚至在我开始能思考和感知艺术与美这类更主观东西的日子里，我从来没被这样深刻打动到几乎落泪的文字。", "个人的讽刺、预期的颠覆，还有我意识深处对药物那份深刻的私人联结。这是一首玩笑的诗，是一件杰作。就算剥去它的核心意义，剥去英语、电子游戏、深夜刷贴这些偏见，它依然向所有语言、所有文化、所有人诉说着巨大的分量。它让我笑出了泪。", "深夜我敲着键盘，每一个字母和空格键的咔哒声都被这件编织精妙的艺术杰作的思绪淹没。我费力想抓住回应它的词语，眼泪顺着脸颊滚落，因为它撼动了我存在的根基，也改变了我对药物这个敏感话题乃至整个人类的理解。", "你的帖子把我彻底打动到如此之深，我实在无法合理地充分感谢你，感谢你带给我的这个对奇妙世界的全新视角。去想象我们在生命宏大又残酷的棋局里有多么微不足道，却用（触发警告：不适宜内容讨论）这款游戏让我有了药物性癖 ☠️ 来嘲弄它。", "药物滥用那巨大的恐怖。它有能力彻底毁掉生命、家庭、文化，拔掉那些把我们钉在舒适位置上的钉子；却又让我们无论周围发生什么都能得到片刻安宁，无论压力如何拖拽都能获得摆脱压力的自由；代价却是往后用法律问题、成瘾、以及身心健康的长期损害来毁掉你的人生。", "药物本身就像一场残酷的恶作剧，是黑暗中希望的隐喻，却也是那个你会一直珍视的残酷、施虐的亲近之人，因为你需要它。它曾闯入你的生命，没有它你就无法运转。成瘾的手已经缠住了你的头，告诉你随时可以走；它知道你会告诉自己‘再来一次就好’，知道你会渴望它那可靠的拥抱，它总能帮你走出最艰难的时刻——哪怕只有一瞬。", "面对如此强烈的情绪、时刻，甚至可能是伤人的提醒，你却用喜悦、快感，甚至可能是狂喜来回应，不只是当下，而是整个恐怖的全景。成瘾的手还不够，你还想把催生它的东西当成傀儡来操控，为了什么？就为了构成我们和我们欲望的那微不足道的一丁点：性诱惑、一种兴奋点、一种‘性癖’。", "可你怎么能不呢？做这种事从来就是我们的一部分，一点也不新鲜。在整个性癖的全景里，药物那支配一切的暴政，比起死亡、血腥、乱伦、粪玩以及无边无际的恶劣性兴奋点，又有多特别、多不同呢。", "从性的角度想，药物本就该是一种兴奋点。它那彻底毁掉人生的效果所带来的绝对支配，被给予者的手随意摆弄。看着床上的伴侣未经同意就软倒在随便什么表面上，沉浸在由你这个支配者所给予的那场无与伦比的纯粹快感狂欢里。", "药物不过是一种可食用的性，任何身体手段都无法匹敌，它直接通过化学方式作用于我们享受性的核心原因——大脑及其反应。在这一层里又多了一层支配：大脑与身体的边界。", "我们总是想脱掉自己，剥去性爱中可能暴露任何东西的部分。可我们总留下一个封闭、看不见、从不被直接干涉的部分：大脑。通过滥用药物，你剥掉了所有可能重要的衣物层，留下比其他任何东西能给予的都更赤裸的自己。", "真心再次感谢你，感谢这件艺术品，这件文学杰作，这个让人捧腹的玩笑，以及你在我生命里留下的永远不会忘记的印记。你通过这篇帖子完美地呈现了对人类及其欲望的理解，我只能从心底深处说声谢谢，感谢这组如此震撼人心的文字，它或许已经改变了我对世界的看法和我的哲学。"];
const chineseTitle = "（触发警告：不适宜内容讨论）这款游戏让我有了药物性癖 ☠️";
const chineseSubstances = [];

const translate = 1; // 0: 提取文本; 1: 插入翻译
const commentCount = 1; // 0 表示全部评论，>0 表示最多处理多少条评论

const documentURL = document.URL;
const redditIdMatch = documentURL.match(/\/comments\/([a-z0-9]+)\//i);
const redditId = redditIdMatch ? redditIdMatch[1] : null;

const textNodenames = ["P", "TH", "TD", "BLOCKQUOTE", "PRE", "H1", "H2", "H3", "H4", "H5", "H6"];
const containerNodenames = ["TABLE", "OL", "UL", "LI", "THEAD", "TR", "TBODY", "TFOOT", "DIV", "SECTION"];

// ================== 样式 ==================
const fontSize = "20px";
const fontSizeTitle = "28px";
const margin = "0";
const textColor = "#1e63db";
const lineHeight = "1.2";

let extractIndex = 0;
let translateIndex = 0;
let originalText = "<raw>";

function addElText(el) {
    if (!el) {
        return;
    }
    originalText += `<el${extractIndex}>${el.textContent}</el${extractIndex}>`;
    extractIndex += 1;
}

function duplicateElement(el) {
    const clone = el.cloneNode(true);
    el.after(clone);
    return clone;
}

function makeCnElementOf(el, text, applyStyle = true, titleStyle = false) {
    if (!el || typeof text !== "string") {
        return null;
    }

    const cnEl = duplicateElement(el);
    cnEl.textContent = text;

    if (applyStyle) {
        if (titleStyle) {
            cnEl.style.fontSize = fontSizeTitle;
            cnEl.style.fontWeight = "700";
        } else if (el.nodeName === "P") {
            cnEl.style.fontSize = fontSize;
        }

        cnEl.style.color = textColor;
        cnEl.style.lineHeight = lineHeight;
        cnEl.style.margin = margin;
    }

    return cnEl;
}

function queryFirst(selectors) {
    for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el) {
            return el;
        }
    }
    return null;
}

function getPostTitleEl() {
    const selectors = [];
    if (redditId) {
        selectors.push(`#post-title-t3_${redditId}`);
    }
    selectors.push("shreddit-post h1[slot='title']");
    selectors.push("h1[slot='title']");
    return queryFirst(selectors);
}

function getPostBodyEl() {
    const selectors = [];
    if (redditId) {
        selectors.push(`#t3_${redditId}-post-rtjson-content`);
    }
    selectors.push("shreddit-post [slot='text-body'] [id$='-post-rtjson-content']");
    selectors.push("shreddit-post-text-body [id$='-post-rtjson-content']");
    return queryFirst(selectors);
}

function walkTranslatableNodes(el, callback) {
    if (!el) {
        return;
    }

    const nodes = [...el.childNodes];
    nodes.forEach((childEl) => {
        if (childEl.nodeType !== Node.ELEMENT_NODE) {
            return;
        }

        if (textNodenames.includes(childEl.nodeName)) {
            if (childEl.textContent.trim() === "") {
                return;
            }
            callback(childEl);
            return;
        }

        if (containerNodenames.includes(childEl.nodeName)) {
            walkTranslatableNodes(childEl, callback);
        }
    });
}

function getCommentEls() {
    const tree = document.querySelector("#comment-tree") || document.querySelector("shreddit-comment-tree");
    if (!tree) {
        return [];
    }
    const allComments = [...tree.querySelectorAll("shreddit-comment")];
    if (commentCount > 0) {
        return allComments.slice(0, commentCount);
    }
    return allComments;
}

function handleNode(el) {
    if (translate) {
        const cnText = chineseParas[translateIndex];
        if (typeof cnText === "string" && cnText.length > 0) {
            makeCnElementOf(el, cnText);
        }
        translateIndex += 1;
        return;
    }
    addElText(el);
}

function handlePostTitle(titleEl) {
    if (!titleEl) {
        return;
    }

    if (translate) {
        if (chineseTitle) {
            makeCnElementOf(titleEl, chineseTitle, true, true);
        }
        return;
    }

    addElText(titleEl);
}

function handlePostBody(bodyEl) {
    walkTranslatableNodes(bodyEl, handleNode);
}

function handleComments(commentEls) {
    for (const commentEl of commentEls) {
        const commentBody = commentEl.querySelector("[slot='comment']");
        if (!commentBody) {
            continue;
        }
        walkTranslatableNodes(commentBody, handleNode);
    }
}

function addTranslatorSignature() {
    const authorEl = queryFirst([
        "shreddit-post [slot='credit-bar'] a[href*='/user/']",
        "shreddit-post [slot='credit-bar']",
        "h1[slot='title']"
    ]);

    if (!authorEl) {
        return;
    }

    const signatureEl = makeCnElementOf(authorEl, "翻译: @SalviaSWC", false);
    if (signatureEl) {
        signatureEl.style.opacity = "0.2";
        signatureEl.style.display = "block";
        signatureEl.style.marginTop = "4px";
    }
}

function buildMarkdownDump() {
    let s = `# ${chineseTitle}`;

    if (chineseSubstances.length > 0) {
        let substances = chineseSubstances.slice(0, chineseSubstances.length - 1).join(", ");
        if (chineseSubstances.length > 1) {
            substances += " & ";
        }
        substances += chineseSubstances[chineseSubstances.length - 1];
        s += ` - ${substances}`;
    }

    s += "\n\n";
    s += "[◀返回](index.md)\n\n";
    s += `原文网址: <${document.URL}>\n\n`;
    s += "---\n\n";
    s += chineseParas.join("\n\n");
    s += "\n\n---\n";
    return s;
}

function main() {
    document.normalize();

    const titleEl = getPostTitleEl();
    const bodyEl = getPostBodyEl();
    const commentEls = getCommentEls();

    handlePostTitle(titleEl);
    handlePostBody(bodyEl);
    handleComments(commentEls);

    if (translate) {
        addTranslatorSignature();
        console.log(buildMarkdownDump());
        console.log(`翻译完成。已消费 chineseParas 数量: ${translateIndex}`);
    } else {
        originalText += "</raw>";
        console.log(originalText);
        console.log(`提取完成。正文+评论片段数量: ${extractIndex}`);
    }

    if (!titleEl || !bodyEl) {
        console.warn("未完整匹配到帖子标题或正文节点，请检查页面是否为 Reddit 帖子详情页。");
    }
}

main();

