'use strict';
/* ===== text3.js: world map, city 2 rooms, characters, objectives, scene dialogue ===== */

/* ---------- world map ---------- */
S('map.title', 'World map', 'خريطة العالم');
S('menu.map', 'World map', 'خريطة العالم');
S('map.hint', 'Choose a city to travel to. Press M to open this map at any time.', 'اختر مدينة للسفر إليها. اضغط M لفتح هذه الخريطة في أي وقت.');
S('map.here', 'You are here', 'أنت هنا');
S('map.done', 'Restored', 'تمت استعادتها');
S('map.open', 'Open', 'مفتوحة');
S('map.locked', 'Locked', 'مغلقة');
S('map.soon', 'Coming soon', 'قريبًا');
S('map.go', 'Travel here', 'سافر إلى هنا');
S('map.close', 'Close', 'إغلاق');
S('map.boss', 'Guardian', 'الحارس');
S('map.soonmsg', 'This city is not open yet. It is coming in a later chapter.', 'هذه المدينة لم تُفتح بعد. ستأتي في فصل لاحق.');
S('map.lockedmsg', 'Finish the previous city first.', 'أنهِ المدينة السابقة أولًا.');
S('map.travel', 'Travel to {x}?', 'هل تريد السفر إلى {x}؟');
S('map.c1', 'Learning Meadows', 'Learning Meadows');
S('map.c2', 'Model Workshop', 'Model Workshop');
S('map.c3', 'Forest of Patterns', 'Forest of Patterns');
S('map.c4', 'Valley of Neighbors', 'Valley of Neighbors');
S('map.c5', 'Valley of Predictions', 'Valley of Predictions');
S('map.c6', 'Islands of Hidden Knowledge', 'Islands of Hidden Knowledge');
S('map.t1', 'Features, labels, supervised learning', 'Features و Labels و Supervised learning');
S('map.t2', 'Train/test split, accuracy, overfitting, data leakage', 'Train/test split و Accuracy و Overfitting و Data leakage');
S('map.t3', 'Classification, decision trees, fairness', 'Classification و Decision trees والإنصاف');
S('map.t4', 'K-nearest neighbors, feature scaling', 'K-nearest neighbors و Feature scaling');
S('map.t5', 'Regression, bias and variance', 'Regression و Bias و Variance');
S('map.t6', 'Clustering, thresholds, data drift', 'Clustering و Thresholds و Data drift');
S('map.b1', 'Misprint', 'Misprint'); S('map.b2', 'Cheater', 'Cheater'); S('map.b3', 'Fanatic', 'Fanatic'); S('map.b4', 'Bulk', 'Bulk'); S('map.b5', 'Rote', 'Rote'); S('map.b6', 'Lag', 'Lag');
S('hud.keys', 'J Journal · C Codex · M Map · Esc Menu', 'J Journal · C Codex · M الخريطة · Esc القائمة');
S('end.cliff', 'The path to the Model Workshop is open. Choose it on the world map.', 'طريق Model Workshop مفتوح. اخترها من خريطة العالم.');
S('end.map', 'Open world map', 'افتح خريطة العالم');

/* ---------- rooms, speakers ---------- */
S('room.quarry', 'Model Workshop: Crystal Quarry', 'Model Workshop: Crystal Quarry');
S('room.workshop', 'Model Workshop: Workshop', 'Model Workshop: Workshop');
S('room.academy', 'Model Workshop: Gem Academy', 'Model Workshop: Gem Academy');
S('spk.tess', 'Tess', 'Tess');
S('spk.orin', 'Master Orin', 'Master Orin');
S('spk.bramm', 'Bramm', 'Bramm');
S('spk.cheater', 'Cheater', 'Cheater');
S('spk.student', 'Academy Student', 'Academy Student');

/* ---------- objectives, locks, looks ---------- */
S('obj2.travel', 'Open the map (M) and travel to the Model Workshop, or follow the lit path east of the Harvest Yard.', 'افتح الخريطة (M) وسافر إلى Model Workshop، أو اتبع الطريق المضيء شرق Harvest Yard.');
S('obj2.workshop', 'Enter the workshop (the building with the teal roof).', 'ادخل الورشة (المبنى ذو السقف الفيروزي).');
S('obj2.tess', 'Talk to Tess by the glass chambers.', 'تحدّث مع Tess عند الغرف الزجاجية.');
S('obj2.orin', 'Speak with Master Orin at the Pattern Engine.', 'تحدّث مع Master Orin عند الـ Pattern Engine.');
S('obj2.acad', 'Climb to the gem academy at the top of the quarry.', 'اصعد إلى أكاديمية الأحجار في أعلى المحجر.');
S('obj2.boss', 'Face Cheater inside the academy.', 'واجه Cheater داخل الأكاديمية.');
S('obj2.path', 'Follow the glowing door at the east edge of the quarry.', 'اتبع الباب المتوهج عند الحافة الشرقية للمحجر.');
S('lock.acad', 'The academy doors are shut. Finish your work in the workshop first.', 'أبواب الأكاديمية مغلقة. أنهِ عملك في الورشة أولًا.');
S('lock.path2', 'The door in the quarry wall will not open yet.', 'باب جدار المحجر لن ينفتح بعد.');
S('tile.mark2', 'The Ancient Mark is carved above the workshop door. It glows faintly when MILO comes near.', 'العلامة القديمة منحوتة فوق باب الورشة. تتوهج بخفة عندما يقترب MILO.');
S('tile.sign2', 'Model Workshop. Rule one: never grade a model on the crystals it studied.', 'Model Workshop. القاعدة الأولى: لا تقيّم الـ Model على البلورات التي درسها.');
S('tile.chambers', 'Two glass chambers. Training is where the Engine studies. Practice is for trying out settings.', 'غرفتان زجاجيتان. الـ Training هي حيث تدرس الـ Engine. والـ Practice لتجربة الإعدادات.');
S('tile.testchamber', 'The Test chamber. Its seal glows red: nothing goes in or out until the exam.', 'غرفة الـ Test. ختمها يتوهج بالأحمر: لا شيء يدخل أو يخرج قبل الامتحان.');
S('tile.engine', 'The Pattern Engine hums, stutters, and hums again. Something is wrong with how it is judged.', 'الـ Pattern Engine تطنّ ثم تتقطّع ثم تطنّ. هناك خطأ في طريقة الحكم عليها.');
S('tile.engine2', 'The Pattern Engine hums steadily now. Its score is honest.', 'الـ Pattern Engine تطنّ بثبات الآن. ودرجتها صادقة.');
S('tile.cart2', 'A cart of crystals waiting to be sorted.', 'عربة مليئة ببلورات تنتظر الفرز.');

/* ---------- arrival ---------- */
S('c2.a1', 'That hum is wrong. Something in there is being praised for the wrong reason.', 'هذا الطنين غير طبيعي. هناك شيء في الداخل يُمدَح لسبب خاطئ.');
S('c2.a2', 'Visitors! Please be careful. The Engine says it is perfect, and it keeps getting things wrong.', 'زوّار! احذروا من فضلكم. الـ Engine تقول إنها مثالية، ومع ذلك تخطئ باستمرار.');
S('c2.a3', 'Perfect, and wrong. Come in, both of you.', 'مثالية... وخاطئة. تفضّلا بالدخول.');
S('c2.a4', 'The Ancient Mark again. I have seen it above this door too.', 'العلامة القديمة مرة أخرى. رأيتها فوق هذا الباب أيضًا.');
S('c2.tess.out', 'Master Orin is inside. Please come in and meet the chambers.', 'Master Orin في الداخل. تفضّلا بالدخول وتعرّفا على الغرف.');
S('c2.tess.idle', 'The Engine is still humming oddly. Master Orin has the Pattern Engine open for you.', 'ما زالت الـ Engine تطنّ بشكل غريب. Master Orin ينتظركما عند الـ Pattern Engine.');
S('c2.tess.win', 'The Engine hums and the score is honest. I did not think I would see that.', 'الـ Engine تطنّ والدرجة صادقة. لم أتوقع أن أرى هذا.');
S('c2.orin.idle', 'Train, predict, reveal. In that order, and never the other way around.', 'Train ثم Predict ثم Reveal. بهذا الترتيب، وليس العكس أبدًا.');
S('c2.orin.win', 'An honest score is rarer than a perfect one. Take good care of it.', 'الدرجة الصادقة أندر من الكاملة. احرصا عليها.');
S('c2.bramm.idle', 'My model says every crystal is a Ruby. Ninety percent right! I stopped checking.', 'نموذجي يقول إن كل بلورة Ruby. صحيح بنسبة تسعين بالمئة! لذلك توقفت عن الفحص.');
S('c2.bramm.win', 'I check the emeralds now. Thanks for opening my eyes.', 'أنا أفحص الـ Emerald الآن. شكرًا لأنك فتحت عينيّ.');
S('c2.student.idle', 'Everyone cheers the PERFECT SCORE, but yesterday this classifier mislabeled a crystal from the market.', 'الجميع يهتف لـ PERFECT SCORE، لكن هذا المصنّف أخطأ البارحة في تصنيف بلورة من السوق.');
S('c2.student.win', 'Now we test honestly. The proctor checks every exam.', 'الآن نختبر بصدق. والمراقب يفحص كل امتحان.');
S('c2.cheater.win', 'I keep the answer key sealed now. Please come visit the honest exams.', 'أبقي ورقة الإجابات مغلقة الآن. زورونا في الامتحانات الصادقة.');

/* ---------- scene 1: the divided workshop ---------- */
S('c2.s1.1', 'The Engine told us it was 100 percent accurate. Then a miner brought a crystal from outside, and it got it wrong.', 'قالت لنا الـ Engine إنها دقيقة بنسبة 100 بالمئة. ثم أحضر عامل منجم بلورة من الخارج، فأخطأت.');
S('c2.s1.2', 'How did you check it?', 'كيف اختبرتموها؟');
S('c2.s1.3', 'I trained it on ten crystals. Then I checked it on those same ten crystals.', 'درّبتها على عشر بلورات. ثم اختبرتها على البلورات العشر نفسها.');
S('c2.s1.4', 'Of course it scored 100 percent. It had already seen every answer.', 'طبعًا حصلت على 100 بالمئة. لقد رأت كل الإجابات مسبقًا.');
S('c2.s1.5', 'So we need crystals the Engine has never seen.', 'إذن نحتاج إلى بلورات لم ترها الـ Engine من قبل.');
S('c2.s1.6', 'Exactly. Master Orin built three chambers. The **Training** chamber is where the Engine studies. The **Test** chamber stays sealed until the very end.', 'بالضبط. بنى Master Orin ثلاث غرف. غرفة الـ **Training** هي حيث تدرس الـ Engine. أما غرفة الـ **Test** فتبقى مغلقة حتى النهاية.');
S('c2.s1.7', 'And the third one?', 'والثالثة؟');
S('c2.s1.8', 'The **Practice** chamber. We try out settings there, like how detailed the rules should be, so we never touch the Test chamber.', 'غرفة الـ **Practice**. نجرّب فيها الإعدادات، مثل مدى تفصيل قواعد الـ Engine، حتى لا نلمس غرفة الـ Test أبدًا.');
S('c2.s1.9', 'Help me divide these ten crystals.', 'ساعدني في تقسيم هذه البلورات العشر.');
S('c2.s1.win', 'That feels right. A fair score has to come from crystals the model has never seen.', 'هذا هو الصحيح. الدرجة العادلة يجب أن تأتي من بلورات لم يرها الـ Model من قبل.');
S('c2.s1.win2', 'Train on one pile. Test on another. Never mix them.', 'درّب على كومة، واختبر على كومة أخرى. ولا تخلط بينهما أبدًا.');
S('c2.s1.t1', 'Master Orin is at the Pattern Engine. He wants to show you the Sealed Chamber routine.', 'Master Orin عند الـ Pattern Engine. يريد أن يريكما روتين الغرفة المغلقة.');

/* ---------- scene 2: the sealed chamber ---------- */
S('c2.s2.1', 'Tess told you about the chambers. Now watch the routine: train, predict, then reveal.', 'أخبرتكما Tess عن الغرف. والآن راقبا الروتين: Train ثم Predict ثم Reveal.');
S('c2.s2.2', 'Why reveal at the end?', 'لماذا نكشف الإجابات في النهاية؟');
S('c2.s2.3', 'Because the Test labels are the answers. If the Engine sees them early, the exam is spoiled.', 'لأن الـ Labels في الـ Test هي الإجابات. إن رأتها الـ Engine مبكرًا فسد الامتحان.');
S('c2.s2.4', 'Like reading the answer sheet before the quiz.', 'مثل قراءة ورقة الإجابات قبل الاختبار.');
S('c2.s2.5', 'Precisely. First the Engine learns from the Training chamber only.', 'تمامًا. أولًا تتعلم الـ Engine من غرفة الـ Training فقط.');
S('c2.s2.6', 'Now it predicts the five Test crystals. Their labels are still hidden from it.', 'الآن تتوقع الـ Engine البلورات الخمس في الـ Test. وما زالت الـ Labels مخفية عنها.');
S('c2.s2.win', 'Four out of five. That score is honest, because the Engine never saw those crystals.', 'أربع من خمس. هذه الدرجة صادقة، لأن الـ Engine لم ترَ هذه البلورات أبدًا.');
S('c2.s2.win2', 'Not perfect. But true.', 'ليست مثالية. لكنها حقيقية.');
S('c2.s2.t1', 'Tess has a model of her own she wants you to check. And the Hall of Measures is next.', 'لدى Tess نموذج خاص بها تريدكما أن تفحصاه. وقاعة المقاييس هي التالية.');

/* ---------- scene 3: the hall of measures ---------- */
S('c2.s3.1', 'A score needs a number. The simplest is **accuracy**: correct predictions divided by all predictions.', 'الدرجة تحتاج إلى رقم. أبسطها هو الـ **Accuracy**: التوقعات الصحيحة مقسومة على كل التوقعات.');
S('c2.s3.2', 'But one number can hide a problem. Look at this model. It always says Ruby.', 'لكن رقمًا واحدًا قد يخفي مشكلة. انظرا إلى هذا الـ Model. إنه يقول Ruby دائمًا.');
S('c2.s3.3', 'In a test of nine rubies and one emerald, it is right nine times.', 'في اختبار فيه تسع بلورات Ruby وواحدة Emerald، يصيب تسع مرات.');
S('c2.s3.win', 'Accuracy is useful, but it is not the whole truth. Always ask which mistakes are hidden inside it.', 'الـ Accuracy مفيدة، لكنها ليست الحقيقة كاملة. اسألوا دائمًا عن الأخطاء المخفية داخلها.');
S('c2.s3.win2', 'That table of right and wrong guesses is called a confusion table. We will look at it more closely later.', 'جدول التوقعات الصحيحة والخاطئة يُسمّى Confusion table. سنتعمق فيه لاحقًا.');
S('c2.s3.t1', 'Bramm the miner has been waiting outside with exactly this problem. Then one more trial: the Mirror.', 'عامل المنجم Bramm ينتظر في الخارج بالمشكلة نفسها تمامًا. ثم تجربة أخيرة: المرآة.');

/* ---------- scene 4: the mirror trial ---------- */
S('c2.s4.1', 'Two apprentices bring me models. Each reports two scores: one on the crystals it trained on, one on crystals it never saw.', 'يحضر لي متدرّبان نموذجين. كل واحد يعرض درجتين: واحدة على البلورات التي تدرّب عليها، وأخرى على بلورات لم يرها.');
S('c2.s4.win', 'A model that does well on new crystals has **generalized**. One that shines only on its training crystals has memorized them.', 'الـ Model الذي ينجح على بلورات جديدة قد حقق **Generalization**. أما الذي يتألق على بلورات التدريب فقط فقد حفظها.');
S('c2.s4.win2', 'That is called overfitting, and we will meet it again.', 'هذا يُسمّى Overfitting، وسنقابله مرة أخرى.');
S('c2.turn.1', 'The Engine is starting!', 'الـ Engine تعمل!');
S('c2.turn.2', 'It hums! No stutter at all!', 'إنها تطنّ! بلا أي تقطّع!');
S('c2.turn.3', 'Wait. Listen.', 'انتظروا. استمعوا.');
S('c2.turn.bell', '[A bell rings from the hill above.]', '[يرنّ جرس من التلّ في الأعلى.]');
S('c2.turn.4', 'The academy\'s gem classifier just announced 100 percent on the Test chamber. Nobody scores 100 percent.', 'أعلن مصنّف الأحجار في الأكاديمية للتو 100 بالمئة على غرفة الـ Test. لا أحد يحصل على 100 بالمئة.');
S('c2.turn.5', 'Unless somebody has the answers.', 'إلا إذا كان أحدهم يملك الإجابات.');
S('c2.turn.6', 'The academy doors swing open at the top of the quarry.', 'تنفتح أبواب الأكاديمية في أعلى المحجر.');

/* ---------- side quests ---------- */
S('c2.sqT.name', 'Tess\'s Perfect Score', 'الدرجة الكاملة عند Tess');
S('c2.sqT.opt', 'Tess\'s Perfect Score (side quest)', 'الدرجة الكاملة عند Tess (مهمة جانبية)');
S('c2.sqT.in', 'My old model scored 100 percent on its training crystals. I want to report that to the village.', 'نموذجي القديم حصل على 100 بالمئة على بلورات التدريب. أريد أن أبلغ القرية بذلك.');
S('c2.sqT.done', 'Sixty percent. Not as proud, but now it is true. I will report that.', 'ستون بالمئة. أقل فخرًا، لكنها الآن حقيقية. سأبلغ بها.');
S('c2.sqB.name', 'The Lazy Miner', 'عامل المنجم الكسول');
S('c2.sqB.in', 'My model says every crystal is a Ruby, and it is 90 percent accurate! So I stopped checking.', 'نموذجي يقول إن كل بلورة Ruby، ودقته 90 بالمئة! لذلك توقفت عن الفحص.');
S('c2.sqB.done', 'I see. It never finds the emerald at all. I will fix that.', 'فهمت. إنه لا يجد الـ Emerald أبدًا. سأصلح ذلك.');
S('c2.sqP.name', 'The Practice Chamber', 'غرفة الـ Practice');
S('c2.sqP.opt', 'The Practice Chamber (side quest)', 'غرفة الـ Practice (مهمة جانبية)');
S('c2.sqP.in', 'I want to choose a setting for the Engine: how detailed its rules should be. Can you help me use the Practice chamber?', 'أريد اختيار إعداد للـ Engine: مدى تفصيل قواعدها. هل تساعدني في استخدام غرفة الـ Practice؟');
S('c2.sqP.done', 'Setting B, and the Test chamber stays sealed. That is how it should be done.', 'الإعداد B، وتبقى غرفة الـ Test مغلقة. هكذا يجب أن يتم الأمر.');
S('c2.ask', 'What would you like to do?', 'ماذا تريد أن تفعل؟');
S('c2.main.s2', 'Continue: the Sealed Chamber', 'تابع: الغرفة المغلقة');
S('c2.main.s3', 'Continue: the Hall of Measures', 'تابع: قاعة المقاييس');
S('c2.main.s4', 'Continue: the Mirror Trial', 'تابع: تجربة المرآة');
S('c2.reh.opt', 'Try the Rehearsal (5 questions)', 'جرّب التدريب (5 أسئلة)');
S('c2.cancel', 'Not now', 'ليس الآن');

/* ---------- boss: cheater ---------- */
S('c2.b.1', 'Everyone cheers the PERFECT SCORE, but yesterday this classifier mislabeled a crystal from the market.', 'الجميع يهتف لـ PERFECT SCORE، لكن هذا المصنّف أخطأ البارحة في تصنيف بلورة من السوق.');
S('c2.b.2', 'My gem classifier scores almost perfectly!', 'مصنّف الأحجار الخاص بي يحقق درجة شبه كاملة!');
S('c2.b.3', 'How did the test set stay unseen?', 'كيف بقيت مجموعة الـ Test غير مرئية؟');
S('c2.b.4', 'The answers were right there. I used them.', 'كانت الإجابات أمامي. فاستخدمتها.');
S('c2.b.5', 'Then the score does not describe the model. It describes the answer key.', 'إذن الدرجة لا تصف الـ Model. إنها تصف ورقة الإجابات.');
S('c2.b.6', 'Let\'s see exactly how you got that score.', 'لنرَ بالضبط كيف حصلت على هذه الدرجة.');
S('c2.b.start', 'Cheater, the Data Leaker', 'Cheater, the Data Leaker');
S('c2.bw.1', 'The score fell after we sealed the answers.', 'انخفضت الدرجة بعد أن أغلقنا الإجابات.');
S('c2.bw.2', 'An honest evaluation is worth more than a perfect but misleading score.', 'التقييم الصادق أثمن من درجة كاملة مضلِّلة.');
S('c2.bw.3', 'I only wanted the cheers. I will keep the answer key sealed from now on.', 'أردت التصفيق فقط. سأبقي ورقة الإجابات مغلقة من الآن.');
S('c2.bw.4', 'Cheater puts down the answer key and becomes the academy\'s test proctor.', 'يضع Cheater ورقة الإجابات ويصبح مراقب الاختبارات في الأكاديمية.');
S('c2.frag', 'Core Fragment 2 appears.', 'يظهر Core Fragment 2.');
S('c2.mem', 'I remember a room full of reports. I read them and I told someone whether they were true. I was the Core\'s monitor.', 'أتذكّر غرفة مليئة بالتقارير. كنت أقرأها وأخبر أحدهم إن كانت صحيحة. كنت مراقب الـ Core.');
S('c2.mem2', 'Then you are the best person to be here.', 'إذن أنت أفضل من يكون هنا.');
S('c2.br.1', 'Now we can test honestly. But a score only tells us how well a model does, not how it reaches a decision.', 'الآن نستطيع الاختبار بصدق. لكن الدرجة تخبرنا كم ينجح الـ Model، لا كيف يصل إلى قراره.');
S('c2.br.2', 'Then the next place asks questions. The path smells like pine.', 'إذن المكان التالي يطرح الأسئلة. الطريق تفوح منه رائحة الصنوبر.');
S('c2.br.3', 'A door in the quarry wall opens onto the edge of the Forest of Patterns.', 'ينفتح باب في جدار المحجر على أطراف Forest of Patterns.');
S('b2.ph1', 'Phase 1: Perfect Score', 'المرحلة 1: Perfect Score');
S('b2.ph2', 'Phase 2: The Leaked Answers', 'المرحلة 2: The Leaked Answers');
S('b2.ph3', 'Phase 3: Seal the Test', 'المرحلة 3: Seal the Test');
S('b2.ph4', 'Phase 4: Honest Evaluation', 'المرحلة 4: Honest Evaluation');
S('b2.vict2', 'Cheater has been convinced! Test scores will be honest from now on.', 'تم إقناع Cheater! ستكون درجات الـ Test صادقة من الآن.');
S('b2.rCodex', 'Codex: Data leakage', 'Codex: Data leakage');
S('b2.taunt', 'Cheater smirks. The leak is still there. Try again.', 'يبتسم Cheater بسخرية. التسريب ما زال موجودًا. حاول مرة أخرى.');

/* ---------- chapter 2 end, journal ---------- */
S('chapter.end2', 'Chapter 2 complete', 'اكتمل الفصل 2');
S('end2.title', 'Model Workshop restored', 'تمت استعادة Model Workshop');
S('end2.body', 'You split the crystals, sealed the test, and caught a perfect score that was not honest.', 'قسّمت البلورات، وأغلقت الـ Test، وكشفت درجة كاملة لم تكن صادقة.');
S('end2.cliff', 'The Forest of Patterns is next. Chapter 3 is coming soon.', 'Forest of Patterns هي التالية. الفصل 3 قادم قريبًا.');
S('end2.frag', 'Core Fragment 2 of 6', 'Core Fragment 2 من 6');
S('j2.1', 'The Divided Workshop', 'The Divided Workshop');
S('j2.2', 'The Sealed Chamber', 'The Sealed Chamber');
S('j2.3', 'The Hall of Measures', 'The Hall of Measures');
S('j2.4', 'The Mirror Trial', 'The Mirror Trial');
S('j2.5', 'Face Cheater in the academy', 'واجه Cheater في الأكاديمية');
S('j2.6', 'Leave for the Forest of Patterns', 'غادر نحو Forest of Patterns');
S('jr.reh2', 'Rehearsal: the Workshop', 'التدريب: Workshop');
