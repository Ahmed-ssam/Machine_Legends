'use strict';
/* ===== text5.js: city 3 (Forest of Patterns) strings, EN / AR ===== */

/* ---------- map, rooms, speakers, objectives ---------- */
S('room.forest', `Forest of Patterns: Glade`, `Forest of Patterns: Glade`);
S('room.council', `Forest of Patterns: Council Clearing`, `Forest of Patterns: Council Clearing`);
S('room.birdgate', `Forest of Patterns: Bird Gate`, `Forest of Patterns: Bird Gate`);
S('spk.fern', `Elder Fern`, `Elder Fern`);
S('spk.qtree', `The Questioning Tree`, `The Questioning Tree`);
S('spk.sylvan', `Keeper Sylvan`, `Keeper Sylvan`);
S('spk.oak', `Elder Oak`, `Elder Oak`);
S('spk.fanatic', `Fanatic`, `Fanatic`);
S('spk.heron', `Heron`, `Heron`);
S('spk.owlet', `Owlet`, `Owlet`);
S('obj3.travel', `Follow the glowing door at the east edge of the quarry, or open the map (M).`, `اتبع الباب المتوهج عند الحافة الشرقية للمحجر، أو افتح الخريطة (M).`);
S('obj3.fern', `Speak with Elder Fern near the forest entrance.`, `تحدّث مع Elder Fern قرب مدخل الغابة.`);
S('obj3.tree', `Visit the Questioning Tree in the middle of the glade.`, `زُر الـ Questioning Tree في وسط المنطقة المكشوفة.`);
S('obj3.sylvan', `Find Keeper Sylvan at the Branching Path, east of the glade.`, `ابحث عن Keeper Sylvan عند الـ Branching Path شرق المنطقة المكشوفة.`);
S('obj3.council', `Enter the Council Clearing, north of the glade.`, `ادخل Council Clearing شمال المنطقة المكشوفة.`);
S('obj3.oak', `Speak with Elder Oak among the trees.`, `تحدّث مع Elder Oak بين الأشجار.`);
S('obj3.gate', `Go to the Bird Gate at the east edge of the forest.`, `اذهب إلى Bird Gate عند الحافة الشرقية للغابة.`);
S('obj3.boss', `Face Fanatic at the Bird Gate.`, `واجه Fanatic عند Bird Gate.`);
S('obj3.path', `Walk through the open Bird Gate.`, `اعبر Bird Gate المفتوحة.`);
S('lock.council', `The path to the Council Clearing is still tangled. Mend the Branching Path first.`, `الطريق إلى Council Clearing ما زال متشابكًا. أصلح Branching Path أولًا.`);
S('lock.gate', `The Bird Gate is sealed. Pass the Council's trial first.`, `Bird Gate مغلقة. اجتز اختبار المجلس أولًا.`);
S('lock.path3', `The Bird Gate has not opened for you yet.`, `لم تنفتح Bird Gate لك بعد.`);
S('tile.signs', `Path signs spin in circles. They no longer know which way anyone should go.`, `لافتات الطرق تدور في دوائر. لم تعد تعرف الاتجاه الذي يجب أن يسلكه أحد.`);
S('tile.signs2', `The signs point steadily now. Every creature has a path.`, `اللافتات تشير بثبات الآن. لكل مخلوق طريق.`);
S('tile.gate3', `A tall arch with a perch for every kind of bird. Over the top: "Birds Welcome". Some birds look worried.`, `قوس عالٍ فيه مجثم لكل نوع من الطيور. فوقه: "Birds Welcome". بعض الطيور تبدو قلقة.`);
S('tile.gate3b', `The Bird Gate welcomes every kind of bird now. A new sign lists what it checks.`, `Bird Gate ترحّب الآن بكل أنواع الطيور. لافتة جديدة تذكر ما تفحصه.`);
S('c3.ask', `What would you like to do?`, `ماذا تريد أن تفعل؟`);

/* ---------- arrival and scene dialogues ---------- */
S('c3.a1', `Tall trees, glowing moss... but look at those signs. They are spinning!`, `أشجار عالية وطحالب متوهجة... لكن انظر إلى تلك اللافتات. إنها تدور!`);
S('c3.a2', `Welcome, travelers. Please, come closer.`, `أهلًا بكما أيها المسافران. تفضّلا، اقتربا.`);
S('c3.fern.out', `Come to me when you are ready to help the forest.`, `تعالَ إليّ حين تكون مستعدًا لمساعدة الغابة.`);
S('c3.fern.idle', `The signs are steady. Thank you, little travelers.`, `اللافتات ثابتة. شكرًا لكما أيها المسافران الصغيران.`);
S('c3.fern.win', `The Bird Gate is open to all birds again. The forest owes you a great deal.`, `Bird Gate مفتوحة لكل الطيور من جديد. الغابة مدينة لكما بالكثير.`);
S('c3.s1.1', `Welcome, travelers. The forest has lost its sense of order.`, `أهلًا بكما. لقد فقدت الغابة إحساسها بالنظام.`);
S('c3.s1.2', `What happened to the paths?`, `ماذا حدث للطرق؟`);
S('c3.s1.3', `The creatures are being sent to the wrong places. The signs no longer recognize them.`, `يُرسَل المخلوقات إلى أماكن خاطئة. لم تعد اللافتات تتعرف عليها.`);
S('c3.s1.4', `Maybe we can help the forest recognize each creature by its features!`, `ربما نستطيع مساعدة الغابة على التعرف على كل مخلوق من خلال Features الخاصة به!`);
S('c3.s1.5', `Features? Explain, little machine.`, `Features؟ اشرح يا أيتها الآلة الصغيرة.`);
S('c3.s1.6', `A **feature** is a piece of information about something. A creature might have wings, have four legs, or live in water.`, `الـ **Feature** معلومة عن شيء ما. قد يكون للمخلوق أجنحة، أو أربع أرجل، أو يعيش في الماء.`);
S('c3.s1.7', `And **classification** means using features to decide which group, or **class**, a creature belongs to.`, `أما **Classification** فتعني استخدام الـ Features لتقرير أي مجموعة، أو **Class**، ينتمي إليها المخلوق.`);
S('c3.s1.8', `Then prove it. Recognize the forest's inhabitants!`, `إذن أثبتا ذلك. تعرّفا على سكان الغابة!`);
S('c3.s1.win', `The signs are beginning to recognize the creatures again!`, `بدأت اللافتات تتعرف على المخلوقات من جديد!`);
S('c3.s1.win2', `We used their features to assign them to classes.`, `استخدمنا Features الخاصة بها لنُسنِد كل مخلوق إلى Class.`);
S('c3.s1.win3', `That is classification! But how does a model decide which questions to ask first?`, `هذه هي Classification! لكن كيف يقرر الـ Model أي الأسئلة يطرحها أولًا؟`);
S('c3.s1.t1', `Follow the path to the Questioning Tree in the heart of the glade. It may hold the answer.`, `اتبعا الطريق إلى Questioning Tree في قلب المنطقة المكشوفة. ربما عندها الجواب.`);

S('c3.tree.idle', `My branches are clear. Come back any time to practise.`, `فروعي واضحة الآن. عُدا في أي وقت للتدرب.`);
S('c3.tree.wait', `Elder Fern is waiting to speak with you first. Go and find her.`, `Elder Fern تنتظر أن تتحدث معكما أولًا. اذهبا وابحثا عنها.`);
S('c3.s2.1', `I once guided every creature with a series of questions.`, `كنت أرشد كل مخلوق بسلسلة من الأسئلة.`);
S('c3.s2.2', `What went wrong?`, `ماذا حدث؟`);
S('c3.s2.3', `My questions became tangled. I can no longer find the right path.`, `تشابكت أسئلتي. لم أعد أجد الطريق الصحيح.`);
S('c3.s2.4', `A **decision tree** uses questions about features to reach a prediction. Maybe we can rebuild your branches!`, `الـ **Decision Tree** يستخدم أسئلة عن الـ Features ليصل إلى Prediction. ربما نستطيع إعادة بناء فروعك!`);
S('c3.s2.5', `Then let us begin with a simple creature.`, `إذن لنبدأ بمخلوق بسيط.`);
S('c3.s2.mid', `Every question is a **decision node**. Each answer follows a **branch**. At the very end waits a **leaf node**, which gives the class.`, `كل سؤال هو **Decision Node**. وكل إجابة تتبع **Branch**. وفي النهاية ينتظر **Leaf Node** الذي يعطي الـ Class.`);
S('c3.s2.6', `Now my second tree is tangled. The water creatures need one more question.`, `والآن تشابكت شجرتي الثانية. المخلوقات المائية تحتاج إلى سؤال إضافي.`);
S('c3.s2.win', `My branches are clear again!`, `فروعي واضحة من جديد!`);
S('c3.s2.win2', `Each question divided the creatures into smaller groups.`, `كل سؤال قسّم المخلوقات إلى مجموعات أصغر.`);
S('c3.s2.win3', `And each path led us closer to a prediction!`, `وكل طريق قرّبنا من Prediction!`);
S('c3.s2.t1', `But with many creatures and many possible questions, how do I choose good ones? Keeper Sylvan at the Branching Path may know.`, `لكن مع مخلوقات كثيرة وأسئلة ممكنة كثيرة، كيف أختار الأسئلة الجيدة؟ ربما يعرف Keeper Sylvan عند Branching Path.`);

S('c3.sylvan.idle', `The Council Clearing is north of the glade. Elder Oak is waiting.`, `Council Clearing شمال المنطقة المكشوفة. Elder Oak في الانتظار.`);
S('c3.sylvan.wait', `The Questioning Tree wants to speak with you first. The paths can wait a little.`, `Questioning Tree تريد أن تتحدث معكما أولًا. الطرق تستطيع الانتظار قليلًا.`);
S('c3.s3.1', `The paths are tangled. Every creature takes the wrong route.`, `الطرق متشابكة. كل مخلوق يسلك طريقًا خاطئًا.`);
S('c3.s3.2', `We can build a decision tree to guide them.`, `نستطيع بناء Decision Tree لإرشادهم.`);
S('c3.s3.3', `But first we need to choose good questions from the creatures' features.`, `لكن علينا أولًا أن نختار أسئلة جيدة من Features المخلوقات.`);
S('c3.s3.4', `A poor question leaves the creatures mixed together. A useful one separates them into clearer groups. We call that **splitting**.`, `السؤال السيّئ يُبقي المخلوقات مختلطة. والمفيد يفصلها إلى مجموعات أوضح. نسمّي ذلك **Splitting**.`);
S('c3.s3.5', `Let us build the tree one question at a time.`, `لنبنِ الشجرة سؤالًا بعد سؤال.`);
S('c3.s3.win', `The paths are clear! Every creature now has a route.`, `الطرق واضحة! صار لكل مخلوق مسار.`);
S('c3.s3.win2', `We built the tree by choosing features and dividing the examples.`, `بنينا الشجرة باختيار الـ Features وتقسيم الأمثلة.`);
S('c3.s3.win3', `But what if one tree makes a bad decision?`, `لكن ماذا لو أخطأت شجرة واحدة في قرارها؟`);
S('c3.s3.t1', `A single tree can be mistaken. Perhaps the Council of Trees knows a wiser way. The clearing to the north is open now.`, `قد تخطئ شجرة واحدة. ربما يعرف Council of Trees طريقة أحكم. الساحة في الشمال مفتوحة الآن.`);

S('c3.oak.wait', `Mend the Branching Path first, little traveler.`, `أصلح Branching Path أولًا أيها المسافر الصغير.`);
S('c3.oak.idle', `The council is at peace. Come back for the trial whenever you wish.`, `المجلس في سلام. عُد للاختبار متى شئت.`);
S('c3.s4.1', `Welcome to the Council. Each of us can make a prediction, but our answers do not always agree.`, `أهلًا بكما في المجلس. كل واحد منا يستطيع أن يتنبأ، لكن إجاباتنا لا تتفق دائمًا.`);
S('c3.s4.2', `What if we combine your predictions?`, `ماذا لو جمعنا Predictions الخاصة بكم؟`);
S('c3.s4.3', `A **random forest** uses many decision trees. For classification the trees vote, and the class with the most votes wins. That is **majority voting**.`, `الـ **Random Forest** يستخدم عدة Decision Trees. وفي Classification تصوّت الأشجار، ويفوز الـ Class الذي يحصل على أكثر الأصوات. هذا هو **Majority Voting**.`);
S('c3.s4.4', `Then let us see whether the wisdom of many trees can guide the forest!`, `إذن لنرَ هل تستطيع حكمة أشجار كثيرة أن ترشد الغابة!`);
S('c3.s4.5', `Real forests train each tree with some randomness, so the trees are not identical copies.`, `في الغابات الحقيقية تُدرَّب كل شجرة بقدر من العشوائية، فلا تكون الأشجار نسخًا متطابقة.`);
S('c3.s4.win', `The forest has found its harmony again!`, `وجدت الغابة انسجامها من جديد!`);
S('c3.s4.win2', `One tree decides with questions. Many trees can vote together.`, `شجرة واحدة تقرر بالأسئلة. وعدة أشجار تستطيع أن تصوّت معًا.`);
S('c3.s4.win3', `Remember, traveler: many voices can help guide a decision, but even a council can be wrong.`, `تذكّر أيها المسافر: أصوات كثيرة قد تساعد على القرار، لكن حتى المجلس قد يخطئ.`);
S('c3.s4.t1', `When you feel ready, ask me for the Forest Mastery Trial.`, `حين تشعر أنك مستعد، اطلب مني Forest Mastery Trial.`);
S('c3.trial.1', `Five challenges await. Each one tests a different part of what you learned.`, `خمسة تحديات في الانتظار. كل واحد يختبر جزءًا مختلفًا مما تعلمتم.`);
S('c3.trial.2', `We are ready.`, `نحن مستعدون.`);
S('c3.trial.win', `You have restored the Council's wisdom. The forest can recognize its patterns once more.`, `لقد استعدتما حكمة المجلس. تستطيع الغابة أن تتعرف على أنماطها من جديد.`);
S('c3.trial.win2', `But patterns can hide surprises. What happens when the data we learn from is not the whole story?`, `لكن الأنماط قد تخبّئ مفاجآت. ماذا يحدث حين لا تكون البيانات التي نتعلم منها هي القصة كلها؟`);
S('c3.trial.gate', `Listen. The Bird Gate to the east has just opened its latch. Something sounds wrong there.`, `اسمعوا. لقد فُتح مزلاج Bird Gate في الشرق للتو. هناك شيء يبدو غير صحيح.`);

/* ---------- boss intro and wrap-up ---------- */
S('c3.b.1', `My learner is excellent. Look how well it recognizes the birds I chose!`, `الـ Learner الذي بنيته ممتاز. انظروا كم يتعرف جيدًا على الطيور التي اخترتها!`);
S('c3.b.2', `You chose only a narrow portion of the birds.`, `أنت اخترت جزءًا ضيقًا فقط من الطيور.`);
S('c3.b.3', `The gate keeps failing for birds like me.`, `البوابة تفشل دائمًا مع طيور مثلي.`);
S('c3.b.4', `A model can perform differently for different groups when its data is not representative.`, `قد يتفاوت أداء الـ Model بين المجموعات حين لا تكون بياناته ممثِّلة.`);
S('c3.b.5', `You would question my perfect score?`, `أتشكّكون في درجتي المثالية؟`);
S('c3.b.6', `I would ask whose examples that score came from.`, `سأسأل: من أي أمثلة جاءت هذه الدرجة؟`);
S('c3.b.start', `Fanatic, the Biased Learner`, `Fanatic, the Biased Learner`);
S('c3.bw.1', `The gate welcomed me today! A real welcome, not a refusal.`, `البوابة رحّبت بي اليوم! ترحيب حقيقي، لا رفض.`);
S('c3.bw.2', `Good results for some groups do not guarantee good results for everyone.`, `النتائج الجيدة لبعض المجموعات لا تضمن نتائج جيدة للجميع.`);
S('c3.bw.3', `I only counted the birds I already liked. I never asked who was missing.`, `أنا عددت الطيور التي أحبها فقط. ولم أسأل يومًا: من الغائب؟`);
S('c3.bw.4', `Fairness means checking coverage and errors for every group. Equal counts alone are not a guarantee.`, `الإنصاف يعني فحص التغطية والأخطاء لكل مجموعة. وتساوي الأعداد وحده ليس ضمانًا.`);
S('c3.cfan.win', `I check every group now before I trust a score.`, `أصبحت أفحص كل مجموعة قبل أن أثق بأي درجة.`);
S('c3.heron.idle', `The gate has been refusing me all week. Please, someone help.`, `البوابة ترفضني منذ أسبوع. أرجوكم، ليساعدني أحد.`);
S('c3.heron.win', `The gate knows me now. Thank you!`, `البوابة تعرفني الآن. شكرًا لكم!`);
S('c3.owlet.idle', `They said I was not a bird. I have feathers!`, `قالوا إنني لست طائرًا. لكن لديّ ريشًا!`);
S('c3.owlet.win', `I flew straight through. It felt wonderful.`, `عبرتُ طائرًا مباشرة. كان شعورًا رائعًا.`);
S('c3.frag', `Core Fragment 3 of 6 obtained.`, `تم الحصول على Core Fragment 3 من 6.`);
S('c3.mem', `A model learns patterns, but its predictions must still be evaluated.`, `الـ Model يتعلم الأنماط، لكن يجب مع ذلك تقييم تنبؤاته.`);
S('c3.mem2', `And checked for every group, not only the biggest one.`, `ويجب فحصه لكل مجموعة، لا للأكبر فقط.`);
S('c3.br.1', `Beyond the Bird Gate lies a valley where closeness is everything.`, `وراء Bird Gate يقع وادٍ يكون فيه القرب هو كل شيء.`);
S('c3.br.2', `The Valley of Neighbors. I wonder who lives there.`, `Valley of Neighbors. أتساءل من يسكن هناك.`);
S('c3.br.3', `The Forest of Patterns is restored. (The next chapter is not ready yet.)`, `تمت استعادة Forest of Patterns. (الفصل التالي لم يجهز بعد.)`);

/* ---------- shared labels ---------- */
S('cls.Bird', `Bird`, `Bird`); S('cls.Fish', `Fish`, `Fish`); S('cls.Amphibian', `Amphibian`, `Amphibian`); S('cls.Mammal', `Mammal`, `Mammal`);
S('cls.Unknown', `Needs more information`, `Needs more information`);
S('cls.NotBird', `Not a bird`, `Not a bird`);
S('ft.wings', `Has wings`, `له أجنحة`); S('ft.feathers', `Has feathers`, `له ريش`); S('ft.legs4', `Has four legs`, `له أربع أرجل`);
S('ft.water', `Lives in water`, `يعيش في الماء`); S('ft.fur', `Has fur`, `له فرو`); S('ft.fins', `Has fins`, `له زعانف`);
S('qs.feathers', `Has feathers?`, `هل له ريش؟`); S('qs.fur', `Has fur?`, `هل له فرو؟`); S('qs.water', `Lives in water?`, `هل يعيش في الماء؟`); S('qs.fins', `Has fins?`, `هل له زعانف؟`);
S('qs.small', `Is it small?`, `هل هو صغير؟`); S('qs.beak', `Short beak?`, `هل منقاره قصير؟`);
S('tr.yes', `Yes`, `نعم`); S('tr.no', `No`, `لا`);
S('tr.feat', `Features`, `Features`); S('tr.class', `Class`, `Class`);
S('c3.tapfirst', `Select your answer first.`, `اختر إجابتك أولًا.`);

/* ---------- scene 1 tasks ---------- */
S('c3.t1.title', `Recognize the creatures`, `تعرّف على المخلوقات`);
S('c3.t1.p', `The signs only light up when the right class is chosen. **{n}** has these features: {f}. Which class does it belong to?`, `اللافتات لا تضيء إلا عند اختيار الـ Class الصحيح. **{n}** له هذه الـ Features: {f}. إلى أي Class ينتمي؟`);
S('c3.t1.h1', `Look carefully at the creature's features.`, `انظر بعناية إلى Features المخلوق.`);
S('c3.t1.h2', `Does it have feathers, fur, or moist skin? Where does it live?`, `هل له ريش أو فرو أو جلد رطب؟ وأين يعيش؟`);
S('c3.t1.ex1', `Skyfin has feathers and wings, so it belongs to the Bird class.`, `Skyfin له ريش وأجنحة، فهو ينتمي إلى Class اسمه Bird.`);
S('c3.t1.ex2', `Pondle has four legs and lives in water, so it belongs to the Amphibian class in this forest.`, `Pondle له أربع أرجل ويعيش في الماء، فهو ينتمي في هذه الغابة إلى Class اسمه Amphibian.`);
S('c3.t1.ex3', `Emberfox has four legs and fur, so it belongs to the Mammal class.`, `Emberfox له أربع أرجل وفرو، فهو ينتمي إلى Class اسمه Mammal.`);
H('c3.t1f', [`Two of these are **features** (information describing a creature). The others are **classes** (the group we predict). Tap the features.`, `اثنان من هذه **Features** (معلومات تصف المخلوق). والبقية **Classes** (المجموعة التي نتنبأ بها). اضغط على الـ Features.`],
  [`A feature is something you can observe about the creature.`, `الـ Feature شيء تستطيع ملاحظته في المخلوق.`], [`A class is the answer we want the model to give. "Bird" is an answer. "Has feathers" is information.`, `الـ Class هو الجواب الذي نريد أن يعطيه الـ Model. "Bird" جواب. و"له ريش" معلومة.`],
  [`"Has feathers" and "Lives in water" describe the creature. "Bird" and "Fish" are the groups we predict.`, `"له ريش" و"يعيش في الماء" يصفان المخلوق. أما "Bird" و"Fish" فهما المجموعتان اللتان نتنبأ بهما.`]);
S('c3.s1.win.x', `The signs glow green!`, `أضاءت اللافتات باللون الأخضر!`);

/* ---------- scene 2 tasks ---------- */
S('c3.t2.title', `Follow the questions`, `اتبع الأسئلة`);
S('c3.t2.tree', `The tree asks: **{q1}** If yes, the answer is Bird. If no, it asks **{q2}** Yes gives Mammal; no gives "Needs more information".`, `الشجرة تسأل: **{q1}** إذا كانت الإجابة نعم فالجواب Bird. وإذا لا فتسأل **{q2}** نعم تعطي Mammal، ولا تعطي "Needs more information".`);
H('c3.t21', [`Cloudwing has feathers and no fur. Follow the tree: what does it predict?`, `Cloudwing له ريش وليس له فرو. اتبع الشجرة: ماذا تتنبأ؟`],
  [`Start at the top question.`, `ابدأ من السؤال الأعلى.`], [`The first question is "Has feathers?". Cloudwing's answer is Yes.`, `السؤال الأول "هل له ريش؟". وإجابة Cloudwing هي نعم.`],
  [`Has feathers? Yes, so the path ends at Bird.`, `هل له ريش؟ نعم، فينتهي الطريق عند Bird.`]);
H('c3.t22', [`Mosskit has no feathers but has fur. Follow the tree: what does it predict?`, `Mosskit ليس له ريش لكن له فرو. اتبع الشجرة: ماذا تتنبأ؟`],
  [`Take the No branch first.`, `خذ فرع "لا" أولًا.`], [`Feathers: No, so we ask the second question: Has fur?`, `الريش: لا، فنسأل السؤال الثاني: هل له فرو؟`],
  [`Feathers: No. Fur: Yes. The path ends at Mammal.`, `الريش: لا. الفرو: نعم. ينتهي الطريق عند Mammal.`]);
S('c3.t2.a1', `Bird`, `Bird`); S('c3.t2.a2', `Mammal`, `Mammal`); S('c3.t2.a3', `Needs more information`, `Needs more information`);
H('c3.t23', [`What do we call a point in the tree where a question is asked?`, `ماذا نسمّي نقطة في الشجرة يُطرح فيها سؤال؟`],
  [`It is a point where the path can go two ways.`, `هي نقطة يستطيع الطريق عندها أن يتفرع في اتجاهين.`], [`The path itself is a branch. The end is a leaf.`, `الطريق نفسه هو Branch. والنهاية هي Leaf.`],
  [`A question point is a decision node. Branches are the paths, and leaf nodes give the final class.`, `نقطة السؤال هي Decision Node. الـ Branches هي الطرق، والـ Leaf Nodes تعطي الـ Class النهائي.`]);
S('c3.t23.a', `A decision node`, `Decision Node`); S('c3.t23.b', `A leaf node`, `Leaf Node`); S('c3.t23.c', `A branch`, `Branch`);
H('c3.t24', [`Which box at the very end of a path gives the final class, like "Bird"?`, `أي صندوق في نهاية الطريق يعطي الـ Class النهائي مثل "Bird"؟`],
  [`It is at the end of the path, not in the middle.`, `إنه في نهاية الطريق، لا في وسطه.`], [`It does not ask a question. It gives an answer.`, `إنه لا يسأل سؤالًا، بل يعطي جوابًا.`],
  [`A leaf node sits at the end of a path and outputs the prediction.`, `الـ Leaf Node في نهاية الطريق، ويعطي الـ Prediction.`]);
S('c3.t24.a', `A leaf node`, `Leaf Node`); S('c3.t24.b', `A decision node`, `Decision Node`); S('c3.t24.c', `The root of the forest`, `جذر الغابة`);
S('c3.t25.title', `Repair the tree`, `أصلح الشجرة`);
H('c3.t25', [`The tree asks "Lives in water?" first. The No branch gives Bird. Which second question separates Ripple (Fish) from Brookle (Amphibian) on the Yes branch?`, `الشجرة تسأل أولًا "هل يعيش في الماء؟". فرع لا يعطي Bird. أي سؤال ثانٍ يفصل Ripple (Fish) عن Brookle (Amphibian) في فرع نعم؟`],
  [`Think about which feature separates the remaining creatures.`, `فكّر في الـ Feature الذي يفصل المخلوقات المتبقية.`], [`Some water creatures have fins, while others do not.`, `بعض المخلوقات المائية لها زعانف وبعضها لا.`],
  [`Ask "Has fins?". Yes leads to Fish and No leads to Amphibian.`, `اسأل "هل له زعانف؟". نعم تؤدي إلى Fish ولا تؤدي إلى Amphibian.`]);
S('c3.t25.a', `Has fins?`, `هل له زعانف؟`); S('c3.t25.b', `Has feathers?`, `هل له ريش؟`); S('c3.t25.c', `Lives in water? (again)`, `هل يعيش في الماء؟ (مرة أخرى)`);

/* ---------- scene 3 tasks ---------- */
S('c3.t3.title', `Build the tree`, `ابنِ الشجرة`);
S('c3.t3.data', `Training examples`, `أمثلة التدريب`);
S('c3.t3.group', `{q}: Yes → {y} | No → {n}`, `{q}: نعم ← {y} | لا ← {n}`);
H('c3.t31', [`Choose the first question. Which one gives the clearest group in a single step?`, `اختر السؤال الأول. أي سؤال يعطي أوضح مجموعة في خطوة واحدة؟`],
  [`Which feature separates one class clearly from the others?`, `أي Feature يفصل Class واحدًا بوضوح عن البقية؟`], [`Feathers can separate all the birds from the remaining classes.`, `الريش يستطيع أن يفصل كل الطيور عن بقية الـ Classes.`],
  [`Start with "Has feathers?". All three Bird examples land together in one clear group.`, `ابدأ بـ "هل له ريش؟". تقع أمثلة Bird الثلاثة معًا في مجموعة واحدة واضحة.`]);
S('c3.t31.a', `Has feathers?`, `هل له ريش؟`); S('c3.t31.b', `Lives in water?`, `هل يعيش في الماء؟`); S('c3.t31.c', `Has fins?`, `هل له زعانف؟`);
H('c3.t32', [`The No group still has Ripple, Deepglow, Brookle and Emberfox. Which question helps split it next?`, `ما زالت مجموعة لا تحتوي Ripple وDeepglow وBrookle وEmberfox. أي سؤال يساعد على تقسيمها بعد ذلك؟`],
  [`Which feature separates the land creature from the water creatures?`, `أي Feature يفصل المخلوق البري عن المخلوقات المائية؟`], [`Emberfox does not live in water. The other three do.`, `Emberfox لا يعيش في الماء. أما الثلاثة الآخرون فيعيشون فيه.`],
  [`Ask "Lives in water?". No leaves just Emberfox (Mammal). Yes keeps Ripple, Deepglow and Brookle together.`, `اسأل "هل يعيش في الماء؟". لا تترك Emberfox وحده (Mammal). ونعم تُبقي Ripple وDeepglow وBrookle معًا.`]);
S('c3.t32.a', `Lives in water?`, `هل يعيش في الماء؟`); S('c3.t32.b', `Has feathers? (again)`, `هل له ريش؟ (مرة أخرى)`); S('c3.t32.c', `What is its name?`, `ما اسمه؟`);
H('c3.t33', [`The water group is Ripple (Fish), Deepglow (Fish) and Brookle (Amphibian). Which last question finishes the tree?`, `مجموعة الماء هي Ripple (Fish) وDeepglow (Fish) وBrookle (Amphibian). أي سؤال أخير يُكمل الشجرة؟`],
  [`The fish and the amphibian differ in one feature.`, `السمكتان والبرمائي يختلفون في Feature واحد.`], [`Fish have fins.`, `الأسماك لها زعانف.`],
  [`Ask "Has fins?". Yes gives Fish and No gives Amphibian.`, `اسأل "هل له زعانف؟". نعم تعطي Fish ولا تعطي Amphibian.`]);
S('c3.t33.a', `Has fins?`, `هل له زعانف؟`); S('c3.t33.b', `Has feathers?`, `هل له ريش؟`); S('c3.t33.c', `Is it a Bird?`, `هل هو Bird؟`);
H('c3.t34', [`Test the tree on a new creature: no feathers, lives in water, no fins. Follow the path. What is the prediction?`, `اختبر الشجرة على مخلوق جديد: بلا ريش، يعيش في الماء، بلا زعانف. اتبع الطريق. ما الـ Prediction؟`],
  [`Answer each question in order, from the top.`, `أجب عن كل سؤال بالترتيب من الأعلى.`], [`Feathers: No. Water: Yes. Fins: No.`, `الريش: لا. الماء: نعم. الزعانف: لا.`],
  [`Feathers: No. Water: Yes. Fins: No. The path ends at Amphibian.`, `الريش: لا. الماء: نعم. الزعانف: لا. ينتهي الطريق عند Amphibian.`]);
S('c3.t34.a', `Amphibian`, `Amphibian`); S('c3.t34.b', `Fish`, `Fish`); S('c3.t34.c', `Mammal`, `Mammal`);

/* ---------- scene 4 tasks ---------- */
S('c3.t4.title', `The Great Forest Vote`, `التصويت الكبير للغابة`);
S('c3.t4.new', `A new creature: no feathers, lives in water, no fins.`, `مخلوق جديد: بلا ريش، يعيش في الماء، بلا زعانف.`);
S('c3.t4.ask', `Ask tree {n}`, `اسأل الشجرة {n}`);
S('c3.t4.says', `Tree {n} votes: {c}`, `الشجرة {n} تصوّت: {c}`);
S('c3.t4.need', `Ask all three trees first.`, `اسأل الأشجار الثلاث أولًا.`);
H('c3.t41', [`Which class will the Random Forest choose, by majority vote?`, `أي Class سيختاره الـ Random Forest بحسب الـ Majority Voting؟`],
  [`Count the votes for each class.`, `عُدّ الأصوات لكل Class.`], [`Two trees say Amphibian and one says Fish.`, `شجرتان تقولان Amphibian وشجرة تقول Fish.`],
  [`Amphibian gets 2 of 3 votes, so the forest predicts Amphibian.`, `يحصل Amphibian على صوتين من 3، فيتنبأ الـ Forest بـ Amphibian.`]);
S('c3.t41.a', `Amphibian`, `Amphibian`); S('c3.t41.b', `Fish`, `Fish`); S('c3.t41.c', `Bird`, `Bird`);
S('c3.t42.title', `The final vote`, `التصويت النهائي`);
S('c3.t42.table', `Five trees vote: Tree 1: Bird, Tree 2: Bird, Tree 3: Mammal, Tree 4: Bird, Tree 5: Mammal.`, `خمس أشجار تصوّت: الشجرة 1: Bird، 2: Bird، 3: Mammal، 4: Bird، 5: Mammal.`);
H('c3.t42', [`What does the forest predict, and with how many votes?`, `ماذا يتنبأ الـ Forest، وبكم صوت؟`],
  [`Count each class separately.`, `عُدّ كل Class على حدة.`], [`Bird appears three times and Mammal twice.`, `Bird تظهر ثلاث مرات وMammal مرتين.`],
  [`Bird gets 3 votes against 2 for Mammal, so the forest predicts Bird.`, `يحصل Bird على 3 أصوات مقابل 2 لـ Mammal، فيتنبأ الـ Forest بـ Bird.`]);
S('c3.t42.a', `Bird, with 3 votes`, `Bird بـ 3 أصوات`); S('c3.t42.b', `Mammal, with 2 votes`, `Mammal بصوتين`); S('c3.t42.c', `Bird, with 5 votes`, `Bird بـ 5 أصوات`);

/* ---------- mastery trial (5 questions) ---------- */
S('c3.r.title', `Forest Mastery Trial`, `Forest Mastery Trial`);
S('c3.r.h', `Think about what the question really asks.`, `فكّر فيما يسأل عنه السؤال حقًا.`);
S('c3.r.h2', `Remove the answer that cannot be right.`, `استبعد الإجابة التي لا يمكن أن تكون صحيحة.`);
S('c3.r.1', `What is the task of classification?`, `ما مهمة الـ Classification؟`);
S('c3.r.1a', `Assigning an object to a category`, `إسناد شيء إلى فئة`); S('c3.r.1b', `Predicting a numerical value`, `التنبؤ بقيمة رقمية`); S('c3.r.1c', `Grouping objects without labels`, `تجميع الأشياء بلا Labels`);
S('c3.r.ex1', `Classification assigns data items to defined classes.`, `الـ Classification تُسنِد عناصر البيانات إلى Classes محددة.`);
S('c3.r.2', `Tree: Has feathers? Yes: Bird. No: Has fur? Yes: Mammal. No: Unknown. A creature has no feathers but has fur. What is the prediction?`, `الشجرة: هل له ريش؟ نعم: Bird. لا: هل له فرو؟ نعم: Mammal. لا: Unknown. مخلوق بلا ريش لكن له فرو. ما الـ Prediction؟`);
S('c3.r.2a', `Mammal`, `Mammal`); S('c3.r.2b', `Bird`, `Bird`); S('c3.r.2c', `Unknown`, `Unknown`);
S('c3.r.ex2', `Follow No from the first question, then Yes from "Has fur?", and you reach Mammal.`, `اتبع "لا" من السؤال الأول، ثم "نعم" من "هل له فرو؟"، فتصل إلى Mammal.`);
S('c3.r.3', `Which feature is most useful for separating birds in this simplified dataset?`, `أي Feature هو الأنفع لفصل الطيور في هذه البيانات المبسّطة؟`);
S('c3.r.3a', `Has feathers?`, `هل له ريش؟`); S('c3.r.3b', `What is the creature's name?`, `ما اسم المخلوق؟`); S('c3.r.3c', `What is the background color?`, `ما لون الخلفية؟`);
S('c3.r.ex3', `Feathers are relevant to the class. A name or a background color tells us nothing about whether it is a bird.`, `الريش مرتبط بالـ Class. أما الاسم أو لون الخلفية فلا يخبراننا إن كان طائرًا.`);
S('c3.r.4', `Five trees vote: Fish, Bird, Bird, Mammal, Bird. What is the majority vote?`, `خمس أشجار تصوّت: Fish وBird وBird وMammal وBird. ما نتيجة الـ Majority Voting؟`);
S('c3.r.4a', `Bird`, `Bird`); S('c3.r.4b', `Fish`, `Fish`); S('c3.r.4c', `Mammal`, `Mammal`);
S('c3.r.ex4', `Bird receives three votes, more than any other class.`, `يحصل Bird على ثلاثة أصوات، أكثر من أي Class آخر.`);
S('c3.r.5', `A single tree makes a mistake, but five trees vote for the correct class. Why can a random forest sometimes do better?`, `أخطأت شجرة واحدة، لكن خمس أشجار صوّتت للـ Class الصحيح. لماذا قد يكون الـ Random Forest أفضل أحيانًا؟`);
S('c3.r.5a', `It combines predictions from many trees`, `لأنه يجمع Predictions من أشجار كثيرة`); S('c3.r.5b', `It always knows the correct answer`, `لأنه يعرف دائمًا الجواب الصحيح`); S('c3.r.5c', `It does not need training data`, `لأنه لا يحتاج إلى Training Data`);
S('c3.r.ex5', `Combining predictions can reduce the effect of one tree's mistake. It does not guarantee a correct answer.`, `جمع الـ Predictions قد يقلل أثر خطأ شجرة واحدة. لكنه لا يضمن جوابًا صحيحًا.`);
S('c3.r.done', `Trial complete!`, `اكتمل الاختبار!`);
S('c3.rank.5', `Forest Master`, `Forest Master`); S('c3.rank.3', `Pattern Seeker`, `Pattern Seeker`); S('c3.rank.0', `Young Apprentice`, `Young Apprentice`);
S('c3.rank.t', `Rank: {r}`, `الرتبة: {r}`);

/* ---------- side quests ---------- */
S('c3.sqF.name', `Which clues matter?`, `أي الدلائل مهمة؟`);
S('c3.sqF.opt', `Elder Fern: a puzzle about useful features`, `Elder Fern: لغز عن الـ Features المفيدة`);
S('c3.sqF.in', `I am teaching the signs to spot Fish, but they chase silly clues. Can you show them which features really help?`, `أعلّم اللافتات كيف تتعرف على Fish، لكنها تلاحق دلائل سخيفة. هل تُريها أي الـ Features تفيد حقًا؟`);
S('c3.sqF.done', `Fins and water. Not songs, not names. The signs learned well.`, `الزعانف والماء. لا الأغاني ولا الأسماء. لقد تعلمت اللافتات جيدًا.`);
S('c3.sqF.title', `Clues for a Fish`, `دلائل لـ Fish`);
H('c3.sqF', [`Tap every feature that actually helps tell a Fish from other creatures.`, `اضغط على كل Feature يساعد فعلًا على تمييز Fish عن المخلوقات الأخرى.`],
  [`Ask: would this clue change my answer?`, `اسأل: هل سيغيّر هذا الدليل جوابي؟`], [`A name or a favorite song says nothing about being a fish.`, `الاسم أو الأغنية المفضلة لا يقولان شيئًا عن كونه سمكة.`],
  [`Has fins and lives in water are related to being a Fish. The name and the song are not.`, `"له زعانف" و"يعيش في الماء" مرتبطان بكونه Fish. أما الاسم والأغنية فلا.`]);
S('c3.sqF.1', `Has fins`, `له زعانف`); S('c3.sqF.2', `Lives in water`, `يعيش في الماء`); S('c3.sqF.3', `Its name starts with R`, `اسمه يبدأ بحرف R`); S('c3.sqF.4', `Sings at dawn`, `يغنّي عند الفجر`);
S('c3.sqS.name', `Useless questions`, `أسئلة عديمة الفائدة`);
S('c3.sqS.opt', `Keeper Sylvan: pick the questions that waste time`, `Keeper Sylvan: اختر الأسئلة التي تُضيّع الوقت`);
S('c3.sqS.in', `Some signposts ask questions that never help. Can you find them before the creatures get lost?`, `بعض اللافتات تطرح أسئلة لا تفيد أبدًا. هل تجدها قبل أن تضيع المخلوقات؟`);
S('c3.sqS.done', `Good eyes. A tree should ask only what helps.`, `عينان حادتان. الشجرة يجب ألا تسأل إلا ما يفيد.`);
S('c3.sqS.title', `Wasted questions`, `أسئلة مهدرة`);
H('c3.sqS', [`The goal is to tell Birds from non-birds. Tap every question that would NOT help.`, `الهدف تمييز Bird عن غير Bird. اضغط على كل سؤال لن يفيد.`],
  [`Would the answer be different for birds and non-birds?`, `هل ستختلف الإجابة بين الطيور وغيرها؟`], [`A name or a background color can be the same for any creature.`, `الاسم أو لون الخلفية قد يكونان نفسهما لأي مخلوق.`],
  [`Name and background color do not separate birds from non-birds. "Has feathers?" does.`, `الاسم ولون الخلفية لا يفصلان الطيور عن غيرها. أما "هل له ريش؟" فيفصل.`]);
S('c3.sqS.1', `What is its name?`, `ما اسمه؟`); S('c3.sqS.2', `What is the background color of the photo?`, `ما لون خلفية الصورة؟`); S('c3.sqS.3', `Has feathers?`, `هل له ريش؟`);
S('c3.sqO.name', `The tied vote`, `التصويت المتعادل`);
S('c3.sqO.opt', `Elder Oak: what if the vote is tied?`, `Elder Oak: ماذا لو تعادل التصويت؟`);
S('c3.sqO.in', `Last night four trees voted and the votes split evenly. The council is worried. What should happen?`, `ليلة أمس صوّتت أربع أشجار فانقسمت الأصوات بالتساوي. المجلس قلق. ماذا يجب أن يحدث؟`);
S('c3.sqO.done', `A tie means there is no majority. A tie-break rule or one more tree settles it.`, `التعادل يعني عدم وجود أغلبية. وقاعدة لكسر التعادل أو شجرة إضافية تحسمه.`);
S('c3.sqO.title', `A tied vote`, `تصويت متعادل`);
H('c3.sqO', [`Four trees vote: Fish, Fish, Bird, Bird. What is the best way to settle it?`, `أربع أشجار تصوّت: Fish وFish وBird وBird. ما أفضل طريقة لحسم الأمر؟`],
  [`Is there a class with more votes than the others?`, `هل هناك Class يملك أصواتًا أكثر من غيره؟`], [`When no class has more votes, you need another way to decide.`, `حين لا يملك أي Class أصواتًا أكثر، تحتاج إلى طريقة أخرى للحسم.`],
  [`There is no majority. Add another tree or use a clear tie-break rule, and say so honestly.`, `لا توجد أغلبية. أضف شجرة أخرى أو استخدم قاعدة واضحة لكسر التعادل، وقل ذلك بصراحة.`]);
S('c3.sqO.a', `There is no majority, so add another tree or use a tie-break rule`, `لا توجد أغلبية، فنضيف شجرة أو نستخدم قاعدة لكسر التعادل`);
S('c3.sqO.b', `Fish wins because it was listed first`, `يفوز Fish لأنه جاء أولًا`); S('c3.sqO.c', `Bird wins because it sounds louder`, `يفوز Bird لأن صوته أعلى`);
S('jr.reh3', `The Forest Mastery Trial`, `Forest Mastery Trial`);

/* ---------- boss: Fanatic, the Biased Learner ---------- */
S('b3.ph1', `Phase 1: One-Sided Evidence`, `المرحلة 1: One-Sided Evidence`);
S('b3.ph2', `Phase 2: The Bird Gate`, `المرحلة 2: The Bird Gate`);
S('b3.ph3', `Phase 3: Restore the Sample`, `المرحلة 3: Restore the Sample`);
S('b3.ph4', `Phase 4: Fairness Check`, `المرحلة 4: Fairness Check`);
S('b3.taunt', `Fanatic crosses his arms. The score still looks perfect to him. Try again.`, `يعقد Fanatic ذراعيه. ما زالت الدرجة تبدو له مثالية. حاول مرة أخرى.`);
S('b3.vict', `Fanatic has been convinced! The gate will now be checked for every kind of bird.`, `تم إقناع Fanatic! ستُفحص البوابة الآن لكل أنواع الطيور.`);
S('b3.rCodex', `Codex: Bias`, `Codex: Bias`);
S('end3.title', `Forest of Patterns restored`, `تمت استعادة Forest of Patterns`);
S('end3.body', `You classified creatures, built trees, counted votes, and asked who was missing from the data.`, `صنّفت المخلوقات، وبنيت الأشجار، وعددت الأصوات، وسألت: من الغائب عن البيانات؟`);
S('end3.cliff', `The Valley of Neighbors is next. Chapter 4 is coming soon.`, `Valley of Neighbors هي التالية. الفصل 4 قادم قريبًا.`);
S('end3.frag', `Core Fragment 3 of 6`, `Core Fragment 3 من 6`);
S('end3.concept', `Fairness skill`, `مهارة الإنصاف`);
S('chapter.end3', `Chapter 3 complete`, `اكتمل الفصل 3`);
S('j3.1', `The Spinning Signs`, `The Spinning Signs`); S('j3.2', `The Questioning Tree`, `The Questioning Tree`); S('j3.3', `The Branching Path`, `The Branching Path`);
S('j3.4', `The Council of Trees`, `The Council of Trees`); S('j3.5', `The Forest Mastery Trial`, `The Forest Mastery Trial`); S('j3.6', `Face Fanatic at the Bird Gate`, `واجه Fanatic عند Bird Gate`); S('j3.7', `Leave for the Valley of Neighbors`, `غادر نحو Valley of Neighbors`);

/* gate scores used by the boss (finches vs the rest) */
S('g.group', `{g}: {n} of {m} correct`, `{g}: {n} من {m} صحيح`);
S('g.finch', `Finches`, `Finches`); S('g.heron', `Herons`, `Herons`); S('g.owl', `Owls`, `Owls`);
S('g.all', `All birds: {n} of {m} correct`, `كل الطيور: {n} من {m} صحيح`);
S('g.train', `Training sample: {a} finches, {b} herons, {c} owls`, `عيّنة التدريب: {a} Finches و{b} Herons و{c} Owls`);
S('g.row', `{g}: {n} of {m}`, `{g}: {n} من {m}`);

Q('q3.1', [`Fanatic says: "My gate recognizes 94 of 100 birds. That is 94%, a nearly perfect score!" What should you check before trusting that number?`, `يقول Fanatic: "بوابتي تتعرف على 94 من 100 طائر. أي 94%، درجة شبه مثالية!" ماذا يجب أن تفحص قبل أن تثق بهذا الرقم؟`],
  [`Which birds were in the test, and how the score looks for each group.`, `أي الطيور كانت في الـ Test، وكيف تبدو الدرجة لكل مجموعة.`], [`Nothing. A high overall score always means the gate is fair.`, `لا شيء. الدرجة الإجمالية العالية تعني دائمًا أن البوابة منصفة.`], [`Only whether the number is bigger than 90.`, `فقط هل الرقم أكبر من 90.`],
  [`An overall score can hide groups the model handles badly.`, `قد تُخفي الدرجة الإجمالية مجموعات يتعامل معها الـ Model بشكل سيئ.`], [`Ask who was in the test set, not only how many were right.`, `اسأل من كان في الـ Test Set، لا فقط كم كان صحيحًا.`],
  [`The overall score mixes all groups together. Always look at who is in the data and at the score for each group.`, `الدرجة الإجمالية تخلط كل المجموعات. انظر دائمًا إلى من في البيانات وإلى درجة كل مجموعة.`]);
H('q3.2', [`Here is the gate's report. Tap every group the gate treats badly (fewer than half correct).`, `هذا تقرير البوابة. اضغط على كل مجموعة تعاملها البوابة بشكل سيئ (أقل من نصفها صحيح).`],
  [`Compare each group's correct count with its total.`, `قارن عدد الصحيح في كل مجموعة بمجموعها.`], [`A group is badly treated if fewer than half of its birds were recognized.`, `تُعامل المجموعة بشكل سيئ إذا تعرفت البوابة على أقل من نصف طيورها.`],
  [`Finches: 94 of 95. Herons: 0 of 3. Owls: 0 of 2. The gate fails Herons and Owls.`, `Finches: 94 من 95. Herons: 0 من 3. Owls: 0 من 2. تفشل البوابة مع Herons وOwls.`]);
H('q3.3', [`The gate recognized {n} of {m} {g}. What is that as a percentage?`, `تعرّفت البوابة على {n} من {m} من {g}. كم تساوي النسبة المئوية؟`],
  [`Divide the correct count by the total.`, `اقسم عدد الصحيح على المجموع.`], [`Then multiply by 100.`, `ثم اضرب في 100.`],
  [`Divide the correct count by the total, then multiply by 100. A percentage for each group shows what the overall score hid.`, `اقسم عدد الصحيح على المجموع ثم اضرب في 100. النسبة لكل مجموعة تُظهر ما أخفته الدرجة الإجمالية.`]);
Q('q3.4', [`The biased tree asks "Is it small?" first. If not small, it answers "Not a bird". A tall heron walks up to the gate. What does the tree predict?`, `الشجرة المتحيّزة تسأل أولًا "هل هو صغير؟". وإن لم يكن صغيرًا تجيب "Not a bird". اقترب Heron طويل من البوابة. ماذا تتنبأ الشجرة؟`],
  [`Not a bird, which is wrong.`, `Not a bird، وهذا خطأ.`], [`Bird, because all herons are birds.`, `Bird، لأن كل Herons طيور.`], [`Needs more information.`, `Needs more information.`],
  [`Follow the first question: is a heron small?`, `اتبع السؤال الأول: هل Heron صغير؟`], [`The heron is tall, so the answer is No. Where does No lead?`, `الـ Heron طويل، فالإجابة لا. إلى أين تؤدي لا؟`],
  [`A tall heron answers No to "Is it small?" and the tree outputs "Not a bird". The tree learned from mostly small finches, so it fails the heron.`, `يجيب Heron الطويل بـ لا عن "هل هو صغير؟" فتُخرج الشجرة "Not a bird". تعلمت الشجرة من Finches صغيرة في الغالب، فتفشل مع Heron.`]);
Q('q3.5', [`Why does the gate fail herons and owls?`, `لماذا تفشل البوابة مع Herons وOwls؟`],
  [`Its training examples had very few herons and owls, so it never learned what they look like.`, `أمثلة تدريبها فيها Herons وOwls قليلة جدًا، فلم تتعلم كيف تبدو.`], [`Herons and owls are not really birds.`, `Herons وOwls ليست طيورًا حقيقية.`], [`The gate is too tired to look carefully.`, `البوابة متعبة جدًا فلا تدقق.`],
  [`Look at the training sample: how many herons and owls were in it?`, `انظر إلى عيّنة التدريب: كم Heron وOwl كانت فيها؟`], [`A model can only learn from the examples it has seen.`, `الـ Model يتعلم فقط من الأمثلة التي رآها.`],
  [`The sample had 92 finches, 5 herons and 3 owls. The model mostly learned what finches look like.`, `العيّنة فيها 92 Finch و5 Herons و3 Owls. تعلم الـ Model في الغالب كيف تبدو Finches.`]);
Q('q3.6', [`Which question could help the tree stop refusing herons and owls, while still refusing non-birds like bats?`, `أي سؤال يستطيع مساعدة الشجرة على التوقف عن رفض Herons وOwls، مع الاستمرار في رفض غير الطيور مثل الخفافيش؟`],
  [`Has feathers?`, `هل له ريش؟`], [`Is it small?`, `هل هو صغير؟`], [`Does it sing?`, `هل يغنّي؟`],
  [`Which feature is true for every kind of bird and false for bats?`, `أي Feature صحيح لكل أنواع الطيور وخاطئ للخفافيش؟`], [`Size and singing differ between bird groups, so they exclude some birds.`, `الحجم والغناء يختلفان بين مجموعات الطيور، فيُقصيان بعضها.`],
  [`Feathers are shared by finches, herons and owls, but not by bats. Size and singing leave some birds out.`, `الريش مشترك بين Finches وHerons وOwls، لكنه غير موجود في الخفافيش. أما الحجم والغناء فيُقصيان بعض الطيور.`]);
H('q3.7', [`Restore the sample. Tap every action that would really help the gate learn all bird groups.`, `استعد العيّنة. اضغط على كل إجراء يساعد البوابة حقًا على تعلم كل مجموعات الطيور.`],
  [`Ask: does this add real information about the missing groups?`, `اسأل: هل يضيف هذا معلومات حقيقية عن المجموعات الغائبة؟`], [`Copying the same finch pictures adds nothing new about herons.`, `نسخ صور Finches نفسها لا يضيف شيئًا جديدًا عن Herons.`],
  [`Collect real examples of herons and owls, and check each group's results after retraining.`, `اجمع أمثلة حقيقية من Herons وOwls، وافحص نتائج كل مجموعة بعد إعادة التدريب.`]);
S('q3.7.1', `Collect more real heron and owl examples`, `اجمع المزيد من أمثلة Heron وOwl الحقيقية`); S('q3.7.2', `Copy the same finch pictures many more times`, `انسخ صور Finches نفسها مرات كثيرة`);
S('q3.7.3', `Retrain, then check the results for each group`, `أعد التدريب ثم افحص النتائج لكل مجموعة`); S('q3.7.4', `Hide the group results and report only the overall score`, `أخفِ نتائج المجموعات وأبلغ بالدرجة الإجمالية فقط`);
Q('q3.8', [`Five trees vote on a heron. Four were trained on the same finch-heavy sample and say "Not a bird". One says "Bird". The forest says "Not a bird". Does voting fix the bias?`, `خمس أشجار تصوّت على Heron. أربع منها دُرّبت على العيّنة نفسها الغنية بـ Finches وتقول "Not a bird". وواحدة تقول "Bird". الـ Forest يقول "Not a bird". هل يصلح التصويت التحيّز؟`],
  [`No. Trees trained on the same biased sample tend to make the same mistake, so voting cannot recover missing data.`, `لا. الأشجار المدرَّبة على العيّنة المتحيّزة نفسها تميل إلى ارتكاب الخطأ نفسه، فلا يستطيع التصويت تعويض بيانات ناقصة.`], [`Yes. Majority voting always makes a model fair.`, `نعم. الـ Majority Voting تجعل أي Model منصفًا دائمًا.`], [`Yes, because five is an odd number.`, `نعم، لأن خمسة عدد فردي.`],
  [`Think about where the trees learned from.`, `فكّر من أين تعلمت الأشجار.`], [`If the examples miss a group, every tree misses it too.`, `إذا غابت مجموعة عن الأمثلة فستغيب عن كل الأشجار.`],
  [`Voting can reduce random errors, but it cannot add examples that were never collected. Representative data matters first.`, `قد يقلل التصويت الأخطاء العشوائية، لكنه لا يضيف أمثلة لم تُجمع أصلًا. تمثيل البيانات هو الأهم أولًا.`]);
S('q3.9.p', `Put the fairness check in the best order.`, `رتّب فحص الإنصاف بأفضل ترتيب.`);
S('q3.9.h1', `You cannot fix what you have not looked at.`, `لا تستطيع إصلاح ما لم تنظر إليه.`); S('q3.9.h2', `Look first, then compare, then fix, then check again.`, `انظر أولًا، ثم قارن، ثم أصلح، ثم افحص مرة أخرى.`);
S('q3.9.ex', `Look at who is in the data, compare errors across groups, add representative examples, then retrain and check every group again.`, `انظر إلى من في البيانات، وقارن الأخطاء بين المجموعات، وأضف أمثلة ممثِّلة، ثم أعد التدريب وافحص كل مجموعة من جديد.`);
S('q3.9.s1', `Look at who is in the training data`, `انظر إلى من في بيانات التدريب`); S('q3.9.s2', `Compare the errors across groups`, `قارن الأخطاء بين المجموعات`);
S('q3.9.s3', `Add representative examples`, `أضف أمثلة ممثِّلة`); S('q3.9.s4', `Retrain and check every group again`, `أعد التدريب وافحص كل مجموعة من جديد`);
S('q3.9.order', `Your order: {x}`, `ترتيبك: {x}`);
Q('q3.10', [`After adding real examples, the gate's overall score is 93% (before: 94%). Herons went from 0% to 75% and owls from 0% to 60%. Is the new gate better?`, `بعد إضافة أمثلة حقيقية صارت الدرجة الإجمالية للبوابة 93% (كانت 94%). وارتفع Herons من 0% إلى 75% وOwls من 0% إلى 60%. هل البوابة الجديدة أفضل؟`],
  [`Yes. It serves every group far better, though we must keep checking, since the small groups are still small.`, `نعم. تخدم كل مجموعة بشكل أفضل بكثير، لكن علينا مواصلة الفحص لأن المجموعات الصغيرة ما زالت صغيرة.`], [`No. The overall score went down, so it is worse.`, `لا. الدرجة الإجمالية انخفضت، فهي أسوأ.`], [`Perfect. Fairness is now guaranteed forever.`, `مثالية. الإنصاف مضمون الآن إلى الأبد.`],
  [`Compare each group, not only the total.`, `قارن كل مجموعة، لا المجموع فقط.`], [`A small drop in the overall score can be a good trade for fixing large failures.`, `انخفاض صغير في الدرجة الإجمالية قد يكون ثمنًا جيدًا لإصلاح إخفاقات كبيرة.`],
  [`Group results improved a lot, but the owl and heron groups are small, so keep checking. Equal counts alone do not guarantee fairness.`, `تحسنت نتائج المجموعات كثيرًا، لكن مجموعتي Owls وHerons صغيرتان، فاستمر في الفحص. والأعداد المتساوية وحدها لا تضمن الإنصاف.`]);

/* ---------- codex ---------- */
CODEX.push('classify', 'feature', 'tree', 'split3', 'forest', 'vote', 'bias');
S('cx.classify.term', `Classification`, `Classification`);
S('cx.classify.body', `Assigning an example to one of several categories, called classes. A classifier learns from labeled examples.`, `إسناد مثال إلى إحدى عدة فئات تسمى Classes. يتعلم الـ Classifier من أمثلة لها Labels.`);
S('cx.feature.term', `Feature and class`, `Feature و Class`);
S('cx.feature.body', `A feature is information describing an example. A class is the category the model predicts.`, `الـ Feature معلومة تصف المثال. والـ Class هو الفئة التي يتنبأ بها الـ Model.`);
S('cx.tree.term', `Decision tree`, `Decision tree`);
S('cx.tree.body', `A model that asks feature questions at decision nodes, follows branches, and ends at a leaf node that gives the prediction.`, `Model يطرح أسئلة عن الـ Features عند Decision Nodes، ويتبع Branches، وينتهي عند Leaf Node يعطي الـ Prediction.`);
S('cx.split3.term', `Splitting`, `Splitting`);
S('cx.split3.body', `Dividing training examples into groups using a feature. Useful splits make the groups more alike in class. Real trees pick splits with criteria such as Gini impurity or entropy.`, `تقسيم أمثلة التدريب إلى مجموعات باستخدام Feature. التقسيمات المفيدة تجعل المجموعات أكثر تشابهًا في الـ Class. وتختار الأشجار الحقيقية التقسيمات بمعايير مثل Gini impurity أو entropy.`);
S('cx.forest.term', `Random forest`, `Random forest`);
S('cx.forest.body', `Many decision trees, each trained with some randomness, whose predictions are combined. It can help, but it does not guarantee a correct answer.`, `عدة Decision Trees، كل واحدة تُدرَّب بقدر من العشوائية، وتُجمع تنبؤاتها. قد يفيد، لكنه لا يضمن جوابًا صحيحًا.`);
S('cx.vote.term', `Majority voting`, `Majority voting`);
S('cx.vote.body', `Choosing the class predicted by the most trees. A tie means no majority, so a tie-break rule is needed.`, `اختيار الـ Class الذي تتنبأ به أكثر الأشجار. التعادل يعني عدم وجود أغلبية، فنحتاج إلى قاعدة لكسر التعادل.`);
S('cx.bias.term', `Bias and representation`, `Bias والـ Representation`);
S('cx.bias.body', `If some groups are missing or rare in the data, a model can work well for some and badly for others. Check results for every group, not only the overall score.`, `إذا غابت مجموعات عن البيانات أو ندرت فيها، فقد يعمل الـ Model جيدًا مع بعضها وسيئًا مع غيرها. افحص النتائج لكل مجموعة، لا الدرجة الإجمالية فقط.`);

/* map strings that change with chapter 3 */
S('map.soonmsg', `This city is still being built. Come back for the next chapter.`, `هذه المدينة ما زالت قيد البناء. عُد من أجل الفصل التالي.`);
S('c3.t21.a', `Bird`, `Bird`); S('c3.t21.b', `Mammal`, `Mammal`); S('c3.t21.c', `Needs more information`, `Needs more information`);
S('c3.t22.a', `Mammal`, `Mammal`); S('c3.t22.b', `Bird`, `Bird`); S('c3.t22.c', `Needs more information`, `Needs more information`);
