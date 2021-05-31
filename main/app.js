//app.js

var plugin = requirePlugin("chatbot");

App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'testdome-9gk6bpszb288ba0b',
      traceUser: true
    })

    // 本地存储判断是否显示Splash
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    //console.log(logs.length);

    if (logs.length > 1) {
      wx.switchTab({
        url: '../../pages/index/index',
      })
    } else {
      wx.redirectTo({
        url: '../../pages/splash/splash',
      })
    }

    let height = 0

    wx.getSystemInfo({
      success: res => {
        //console.log(res);
        let isIOS = res.system.indexOf("iOS") > -1;
        let navHeight = 0;
        if (!isIOS) {
          navHeight = 48;
        } else {
          navHeight = 44;
        }
        height = navHeight + res.statusBarHeight
      }
    });

    plugin.init({
      // appid: "P5Ot9PHJDechCYqDFAW1AiK6OtG3Ja",
      appid: "6X1syQyVo25YhGwFoE35cgSRp9cxox", // 改成自己机器人后台的小程序插件APPID
      openid: "oB6jg6ENstneouhXefbujwJl7v2n", // 不能改
      userHeader: "cloud://test-8gsvpzwg49d8e931.7465-test-8gsvpzwg49d8e931-1304016489/xiaozhi.png", // 用户头像
      userName: "XiaoZhi", // 用户昵称，不能用中文。
      textToSpeech: true,
      guideList: ["小知老师", "校规校纪", "奖学金", "请假"],
      welcome: '同学你需要什么帮助？',
      background: "#eee",
      guideCardHeight: 50,
      operateCardHeight: 120,
      // history: true,
      // historySize: 60,
      navHeight: height,
      success: () => {

        // 唤醒对话机器人
        /*
        plugin.send({
          query: "你好",
          success: res => {
            console.log('Chatbot respon: ', res);
          },
          fail: error => {}
        });
        */

        // NLU文档：https://developers.weixin.qq.com/doc/aispeech/miniprogram/tokenize.html

        //var article1 = "各位同学：\n根据国家教育部考试中心的安排，2020年下半年全国大学英语四、六级笔试将于12月12日举行。为保证考试顺利进行，现将我校报名工作有关事项通知如下：\n一、我校开考语种级别及考试时间语种级别考试日期考试时间英语四级笔试12月12日9:00-11:20英语六级笔试12月12日15:00-17:25英语四级口试11月21日8:30—16:00英语六级口试11月22日8:30—16:00\n二、报名资格\n1、全国大学英语四、六级考试笔试（CET）报考资格为：我校在籍在校研究生以及我校2019级、2018级、2017级、2016级（五年制）全日制在校本科学生。英语四级（CET4）成绩达到425分的学生方可报考英语六级（CET6）。\n2、报考全国大学英语四、六级口语考试的考生，必须符合相应语种级别笔试报考条件。完成本次英语四级（CET4）笔试报名的考生可以报考英语四级口语考试（CET—SET4）；完成本次英语六级（CET6）笔试报名的考生可以报考英语六级口语考试（CET—SET6）。\n三、报名方式报名实行网上报名。考生登录全国大学英语四、六级考试网站(cet-bm.neea.edu.cn)注册用户、查证报名资格、核对个人信息，选择笔试语种级别、通过银行卡或支付宝缴费即完成报名。笔试报名完成的考生，可以选择口语考试报名。我校英语四级口语考试的容量为500人，英语六级口语考试的容量为500人，额满即止。我校口语考试的考场设在呈贡校区。云南大学、昆明理工大学、云南财经大学学生口语报名时间：2020年9月21日13:00—10月12日17:00。其他考点的学生口语报名时间：9月28日13：00—10月12日17:00。\n四、笔试报名时间：2020年9月23日13:00—10月12日17:00\n五、报名费：\n1、笔试报名费CET4为25元，CET6为35元；\n2、口语报名费CET4为50元，CET6为50元。\n六、特别提醒：\n1、考生须有学籍信息和照片方能报名。请登录报名系统仔细核对个人学籍信息，如果学籍信息有误请与本科生院联系，电话：65033818；如果没有照片或照片格式有误（如照片模糊或方向倾斜），请将格式为jpg的证件照发送至邮箱ajiao8719@sina.com，照片须以身份证号命名，照片大小不超过200KB；\n2、考生只能在学院所在校区进行笔试；\n3、考生必须在报名12小时内缴费，否则系统视为考生自行放弃报名，并将自动清除报名信息；完成缴费后，并再次登录系统确认是否报名成功；\n4、在校残疾大学生报名参加四、六级考试并申请提供合理便利的，请自行完成网上报名，并在报名截止前及时与本科生院联系，提供相关材料；\n5、如果报名系统显示有问题，请更换不同的浏览器试试，推荐使用火狐浏览器。";

        //var article2 = "各位考生：\n2020年下半年第58次全国计算机等级考试将于9月26日、27日在我校呈贡校区文汇楼3栋机房举行。现将考试有关注意事项及防疫要求通知如下：\n1、考生须认真阅读《全国计算机等级考试（NCRE）考生须知》\n（见附件），按照要求做好相关准备工作。\n2、因疫情防控期间，考生须在考试开始前30分钟进入考场门外候考。迟到考生不得入场，考试开始15分钟后可交卷离场，考试过程中不得离场，离场后不得继续参加考试。\n3、根据《新冠肺炎疫情防控常态化下全国计算机等级考试组考防疫工作的指导意见》做好防疫工作。\n（1）从考前第14天开始，自行每日体温测量，填写“健康情况承诺书”、“体温自我检测登记表”（每位考生每科目一张），进入考场时上交，否则不得入场参加考试，出现身体异常情况的要及时就医并报告。\n（2）如考生为新冠肺炎确诊病例、无症状感染者、疑似患者、确诊病例密切接触者，或治愈未超过14天的病例、不能排除感染可能的发热患者，不得参加本次考试。\n（3）若考生于考前14天内有境外或非低风险地区活动轨迹的，\n须及时上报。（4）考生进入文汇楼3栋时需接受体温测量，体温超过37.3℃，不得参加考试，由校医院根据防疫要求实施应急处置。考试中途体温超过37.3℃，由校医院根据防疫要求实施应急处置。\n（5）考生于考试当天必须佩戴口罩，不佩戴口罩不得进入考点和考场。口罩由学生自行准备。\n（6）每个考场配备免洗手75%酒精消毒液，要求考生在进场前用消毒液充分洗手，保持手部卫生。\n（7）需有序进场、离场，不得拥挤。\n（8）配合考点做好考务管理及防疫要求。考试过程中有身体不适的情况，须及时汇报。\n\n附件：全国计算机等级考试（NCRE）考生须知本科生院联系方式：65033818";

        // AI死线Demo
        /*
        plugin.api.nlp("ner", {
          q: article1
        }).then((res) => {
          //console.log("ner result : ", res);
          //console.log(res.entities);
          var timeList = [];
          for (let resItem of res.entities) {
            if (resItem.type == "datetime_point") {
              //console.log(resItem);
              timeList.push(resItem.norm);
            }
          }
          console.log(timeList);
        });
        */

        // AI聚合Demo
        /*
        plugin.api.nlp("tokenize", {
          q: article2
        }).then((res) => {
          //console.log("tokenize result : ", res);

          // 实体关键词
          var keywordList = [];
          for (var i = 0; i < res.entities.length; i++) {
            if (res.entity_types[i] != '100000023') {
              //console.log(resItem);
              keywordList.push(res.entities[i]);
            }
          }
          //console.log(keywordList);

          function unique(arr) {
            return Array.from(new Set(arr));
          }

          var uniqueList = unique(keywordList);
          console.log(uniqueList);

        });
        */

        // 时间语义
        /*const txt1 = "11月25日，中央军委军事训练会议在京召开，习近平主席出席会议并发表重要讲话。他强调，全军要贯彻新时代党的强军思想，贯彻新时代军事战略方针，坚持聚焦备战打仗，坚持实战实训、联战联训、科技强训、依法治训，发扬优良传统，强化改革创新，加快构建新型军事训练体系，全面提高训练水平和打赢能力，为实现党在新时代的强军目标、把我军全面建成世界一流军队提供坚强支撑。";
        plugin.api.nlp("ner", {
          q: txt1
        }).then((res) => {
          console.log("ner result : ", res);
        });*/

        // 分词
        /*
        const txt2 =
          "11月26日下午，国防部举行例行记者会，国防部新闻局副局长、国防部新闻发言人任国强大校答记者问。记者：克里斯托弗·米勒日前出任美国代理国防部长。请问中方如何看待此次人事调整？这是否影响两军关系发展？任国强：我们注意到近期美国防务部门领导人的调整。这是美国的内政,中方不予置评。我要强调的是，中方始终重视中美两军关系发展。保持两军关系健康稳定发展符合中美双方的根本利益，也是国际社会的共同期待。我们希望美方与中方相向而行，秉持不冲突不对抗、相互尊重、合作共赢的原则，增进彼此理解，避免误解误判，继续聚焦合作，管控风险分歧，为维护中美两国两军关系稳定、促进中美两国人民和世界各国人民的共同利益作出努力。";

        plugin.api.nlp("tokenize", {
          q: txt2
        }).then((res) => {
          console.log("tokenize result : ", res);
        });
        */

        // 情感分析
        /*
        const txt3 = "谁的气场更大，在这场狂吠大选在，谁就有可能胜出，现在特朗普狂吠的声音更大，特朗普的气场更足，特朗普胜出的概率就更大，美国大选是狺狺狂吠，鼓噪的大选，特朗普和拜登互相狺狺狂吠之后，只剩下一地狗毛了！";

        plugin.api.nlp('sentiment', {
          q: txt3,  mode: '6class'
        }).then(res => {
          console.log("sentiment result : ", res)
        })
        */

        // 敏感内容检测
        /*const txt4 = "楼主真垃圾，祝你早日死全家";
        plugin.api.nlp('sensitive', {
          q: txt4, mode: 'bert'
        }).then(res => {
          console.log("sensitive result : ", res)
        })*/

        //商品关键词抽取接口
        /*
        const txt5 = "小米充电宝";
        plugin.api.nlp("ner-product", {
          q: txt5
        }).then((res) => {
          console.log("ner result : ", res);
        });
        */

        //相似度计算接口
        /*
        const txt6 = "北京到上海的火车票";
        plugin.api.nlp('rank', {
          q: txt6, candidates: [{
              question: "上海到北京的火车票"
            },
            {
              question: "北京到上海的飞机票"
            },
            {
              question: "北京到上海的高铁票"
            }
          ]
        }).then(res => {
          console.log("rank result : ", res)
        })*/

        //中译英
        /*
        const txt = "北京的天气怎么样?";
        plugin.api.nlp("translate_cn2en", {
          q: txt
        }).then((res) => {
          console.log("translate_cn2en result : ", res);
        });*/
        //英译中
        /*const txt = "what are you doing?";
        plugin.api.nlp("translate_en2cn", {
          q: txt
        }).then((res) => {
          console.log("translate_en2cn result : ", res);
        });*/

        //新闻摘要
        /*
        const data = {
          "title": "大标题: 周杰伦透露孩子性格像自己",
          "content": "自侃：在家地位不高周杰伦晒与儿子\\r\\n周杰伦与妻子昆凌\\r\\n新浪娱乐讯据台湾媒体报道，周杰伦今受邀出席公益篮球活动，许久没公开亮相的他坦言：“大家看我的社交网站就知道，现在玩乐和陪家人是最重要的。”他预计10月将启动全新巡演，但聊到新专辑，他笑说：“目前已经做好5首，但包括上次做好的2首。”进度严重落后，巡演前能否来得及推出仍是未知数。\r\\n周杰伦曾被“老萧”萧敬腾与五月天阿信调侃：“巴黎铁塔好像是他家一样”，周杰伦也坦言有考虑在法国置产，地点属意：“有巴黎铁塔蛮重要的”，他感叹身处欧洲比较可以自由自在走在街上，就算被粉丝认出，打个招呼就滑着滑板溜走，不用跑得太狼狈。\\r\\n今天他与小朋友共享篮球时光，但聊到自己的一双儿女，他说：“小朋友个性像自己，比较顽固一点，小朋友都是这样、比较讲不听，严格来说我扮黑脸也是没什么用，在家里地位不是很高。”他形容女儿就像自己“另个女朋友”，有时候想和她和好还被拒绝，一直被闹别扭，周杰伦无奈说：“我还不知道怎么对待一个女儿。”倒是儿子比较怕他，只要一出声就会低头认错，“像他会画在桌子上，家里很多画，就会教他看画手要放在后面，不要摸”严父模样只有儿子会买单。\\r\\n阿信曾夸周杰伦是“华人音乐圈精神领袖”，周杰伦赞阿信是“心目中真正的音乐人”，曾邀阿信到家中作客，2人畅谈音乐，阿信还精辟分析他专辑，“发现他是实际有在听我歌曲的人”，但问到每次打球都只邀萧敬腾，周杰伦笑说有透过社交网站约阿信打球，每次却只被回表情符号，忍不住说：“他说他以前打曲棍球，我是不太相信的。”\\r\\n周杰伦将于10月启动全新巡演，谈到近期的困扰，就是还没想到一个很威的名字，“想不到比‘地表最强’更好的，但这次跟（出道）20年有关，会比较欢乐，不是走自己多强势的感觉”。\\r\\n(责编：漠er凡)\\r\\n",
          "category": "娱乐",
          "do_news_classify": true
        };

        plugin.api.nlp('news-abstraction', data).then(res => {
          console.log("news-abstraction result: ", res)
        })
        */

        // 诗歌问答
        /*
        plugin.api.nlp('poem_fetch_question', {question_count: 5, userid: '1234243434'}).then(res => {
          console.log("poem_fetch_question result : ", res)
        })*/

        function unique(arr) {
          return Array.from(new Set(arr));
        }

        /*const db = wx.cloud.database({});
        db.collection("inform_orig").where({
          ai_aggr: 0
        }).get({
          success: function (res) {
            // console.log(res.data);

            let nodeData = [];

            let count = 0;
            let total = res.data.length;
            res.data.forEach(dataItem => {
              //console.log(dataItem.article);

              let thisNode = dataItem;

              plugin.api.nlp("tokenize", {
                q: dataItem.article
              }).then((res) => {
                //console.log("tokenize result : ", res);
                count++;

                // 实体关键词
                var keywordList = [];
                for (var i = 0; i < res.entities.length; i++) {
                  if (res.entity_types[i] != '100000023') {
                    //console.log(resItem);
                    keywordList.push(res.entities[i]);
                  }
                }
                //console.log(keywordList);

                var uniqueList = unique(keywordList);
                //console.log(uniqueList);

                uniqueList.forEach(listItem => {

                  let noFlag = true;
                  nodeData.forEach(nodeItem => {
                    if (nodeItem.tag == listItem) {
                      noFlag = false;
                      nodeItem.nodes.push(thisNode);
                    }
                  });

                  if (noFlag) {
                    nodeData.push({
                      'tag': listItem,
                      'nodes': [thisNode]
                    });
                  }

                });

                if (count == total) {
                  //console.log(nodeData);

                  db.collection('inform_ai_aggregation').doc("b1a52c595fc16b9d008a4da917a4b533").set({
                    data: {
                      nodeData
                    },
                    success: res => {
                      console.log("更新成功");
                    },
                    fail: err => {
                      console.error('更新失败：', err)
                    }
                  })
                }

              });

            });
          }
        });

        db.collection("inform_orig").where({
          ai_deadline: 0
        }).get({
          success: function (res) {
            // console.log(res.data);

            let nodeData = [];

            let count = 0;
            let total = res.data.length;
            res.data.forEach(dataItem => {
              //console.log(dataItem.article);

              let thisNode = dataItem;

              plugin.api.nlp("ner", {
                q: dataItem.article
              }).then((res) => {
                count++;

                //console.log("ner result : ", res);
                //console.log(res.entities);
                var timeList = [];
                for (let resItem of res.entities) {
                  if (resItem.type == "datetime_point") {
                    //console.log(resItem);
                    timeList.push(resItem.norm);
                  }
                }
                //console.log(timeList);

                var uniqueList = unique(timeList);

                uniqueList.forEach(listItem => {

                  let noFlag = true;
                  nodeData.forEach(nodeItem => {
                    if (nodeItem.tag == listItem) {
                      noFlag = false;
                      nodeItem.nodes.push(thisNode);
                    }
                  });

                  if (noFlag) {
                    nodeData.push({
                      'date': listItem,
                      'nodes': [thisNode]
                    });
                  }

                });

                if (count == total) {
                  //console.log(nodeData);

                  db.collection('inform_ai_deadline').doc("e62469b25fc16d58007925555f4d597e").set({
                    data: {
                      nodeData
                    },
                    success: res => {
                      console.log("更新成功");
                    },
                    fail: err => {
                      console.error('更新失败：', err)
                    }
                  })
                }

              });

            });
          }
        });*/

      },
      fail: error => {}
    });


  },
  globalData: {
    userInfo: null,
    viewNode: {},
    
  },
  onHide: function (res) {
    //console.log(res + "-----------------")
  }
})