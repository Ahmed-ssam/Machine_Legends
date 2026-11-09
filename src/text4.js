'use strict';
/* ===== text4.js: city 2 tasks, hints, rehearsal, boss questions, codex ===== */

/* Q(id, prompt, correct, wrongB, wrongC, hint1, hint2, explanation): each argument is [en, ar] */
function Q(id, p, a, b, c, h1, h2, ex) {
  S(id + '.p', p[0], p[1]); S(id + '.a', a[0], a[1]); S(id + '.b', b[0], b[1]); if (c) S(id + '.c', c[0], c[1]);
  S(id + '.h1', h1[0], h1[1]); S(id + '.h2', h2[0], h2[1]); S(id + '.ex', ex[0], ex[1]);
}
/* H(id, prompt, hint1, hint2, explanation): hands-on task text */
function H(id, p, h1, h2, ex) { S(id + '.p', p[0], p[1]); S(id + '.h1', h1[0], h1[1]); S(id + '.h2', h2[0], h2[1]); S(id + '.ex', ex[0], ex[1]); }

/* ---------- shared labels ---------- */
S('lbl.Ruby', 'Ruby', 'Ruby');
S('lbl.Emerald', 'Emerald', 'Emerald');
S('cr.glow', 'Glow', 'Glow');
S('cr.size', 'Size', 'Size');
S('cr.label', 'Label', 'Label');
S('cr.card', 'Label: {x}', 'Label: {x}');
S('cr.n', 'Crystal {n}', 'Crystal {n}');
S('ch.train', 'Training', 'Training');
S('ch.prac', 'Practice', 'Practice');
S('ch.test', 'Test', 'Test');

/* ---------- scene 1 ---------- */
S('c2.t1.title', 'Divide the crystals', 'قسّم البلورات');
H('c2.sort', ['Assign each of the ten crystals to a chamber. The Engine learns from Training, Practice is for trying settings, and Test stays sealed for the final exam.', 'خصّص كل بلورة من البلورات العشر لإحدى الغرف. تتعلم الـ Engine من Training، والـ Practice لتجربة الإعدادات، وتبقى Test مغلقة للامتحان النهائي.'],
  ['Which chamber is the Engine allowed to learn from?', 'من أي غرفة يُسمح للـ Engine بأن تتعلم؟'],
  ['Training should hold most of the crystals. Practice and Test need a few each, and Test stays sealed.', 'يجب أن تضم Training معظم البلورات. وتحتاج Practice وTest إلى بضع بلورات لكل منهما، وتبقى Test مغلقة.'],
  ['A good split is 6 in Training, 2 in Practice and 2 in Test.', 'تقسيم جيد: 6 في Training و2 في Practice و2 في Test.']);
S('c2.sort.ok', 'Most crystals train the Engine, a few are for Practice, and a few stay sealed in Test.', 'معظم البلورات تدرّب الـ Engine، وقليل منها للـ Practice، وقليل يبقى مغلقًا في الـ Test.');
S('c2.sort.few', 'The Engine needs plenty of crystals to learn from. Put at least 5 in Training.', 'تحتاج الـ Engine إلى بلورات كثيرة لتتعلم منها. ضع 5 على الأقل في Training.');
S('c2.sort.prac', 'Put at least one crystal in Practice so settings can be tried out.', 'ضع بلورة واحدة على الأقل في Practice حتى تُجرَّب الإعدادات.');
S('c2.sort.test', 'The Test chamber needs at least two crystals to give a fair score.', 'تحتاج غرفة الـ Test إلى بلورتين على الأقل لتعطي درجة عادلة.');
S('c2.sort.many', 'Too many crystals are locked away. Keep 1 or 2 in Practice and 2 or 3 in Test.', 'عدد كبير من البلورات محجوز. أبقِ 1 أو 2 في Practice و2 أو 3 في Test.');
S('c2.sort.count', 'Training {a} · Practice {b} · Test {c}', 'Training {a} · Practice {b} · Test {c}');
S('c2.toy.title', 'Split and score', 'قسّم وسجّل');
H('c2.toy', ['The Engine memorized the 12 Training crystals. Score it on the Training chamber and on the Test chamber, then compare.', 'حفظت الـ Engine بلورات الـ Training الاثنتي عشرة. سجّل درجتها على غرفة الـ Training ثم على غرفة الـ Test، وقارن.'],
  ['Which crystals has the Engine already seen?', 'أي البلورات رأتها الـ Engine من قبل؟'],
  ['A score on crystals the model has already seen tells us little about new crystals.', 'درجة على بلورات رآها الـ Model من قبل لا تخبرنا الكثير عن البلورات الجديدة.'],
  ['The Training score only shows memory. The Test score shows how the Engine handles crystals it has never seen.', 'درجة الـ Training تُظهر الذاكرة فقط. أما درجة الـ Test فتُظهر كيف تتعامل الـ Engine مع بلورات لم ترها أبدًا.']);
S('c2.toy.train', 'Training chamber · 12 crystals', 'غرفة Training · 12 بلورة');
S('c2.toy.prac', 'Practice chamber · 3 crystals', 'غرفة Practice · 3 بلورات');
S('c2.toy.test', 'Test chamber · 5 crystals', 'غرفة Test · 5 بلورات');
S('c2.toy.btn1', 'Score on Training', 'سجّل على Training');
S('c2.toy.btn2', 'Score on Test', 'سجّل على Test');
S('c2.toy.score', '{n} of {m} correct · {pct}%', '{n} من {m} صحيحة · {pct}%');
S('c2.toy.need', 'Run both scores first.', 'شغّل الدرجتين أولًا.');
S('c2.toy.q', 'Why is the Training score higher than the Test score?', 'لماذا درجة الـ Training أعلى من درجة الـ Test؟');
S('c2.toy.a', 'The Engine has already seen the Training crystals, but the Test crystals are new to it.', 'لأن الـ Engine رأت بلورات الـ Training من قبل، أما بلورات الـ Test فجديدة عليها.');
S('c2.toy.b', 'The Test crystals were chosen to be unfair.', 'لأن بلورات الـ Test اختيرت لتكون غير عادلة.');
S('c2.toy.c', 'Scoring on the Test chamber breaks the Engine.', 'لأن التسجيل على غرفة الـ Test يُتلف الـ Engine.');

/* ---------- scene 2 ---------- */
S('c2.t2.title', 'The Sealed Chamber', 'The Sealed Chamber');
Q('c2.t21', ['While the Engine is learning, which crystals may it look at?', 'أثناء تعلّم الـ Engine، أي البلورات يجوز لها أن تنظر إليها؟'],
  ['Only the Training chamber.', 'غرفة الـ Training فقط.'], ['Training and Test, so it learns faster.', 'Training وTest معًا، لتتعلم أسرع.'], ['Test only, because those are the real exam crystals.', 'Test فقط، لأنها بلورات الامتحان الحقيقية.'],
  ['Remember the exam: what happens if the Engine sees the answers early?', 'تذكّر الامتحان: ماذا يحدث إن رأت الـ Engine الإجابات مبكرًا؟'],
  ['Test labels are the answers. They stay sealed until the end.', 'الـ Labels في الـ Test هي الإجابات. وتبقى مغلقة حتى النهاية.'],
  ['Only Training. Seeing Test labels early would spoil the exam.', 'Training فقط. رؤية الـ Labels في الـ Test مبكرًا تفسد الامتحان.']);
S('c2.t22.title', 'Reveal the labels', 'اكشف الـ Labels');
H('c2.t22', ['The Engine predicted all five Test crystals. Reveal each true label, then work out the Test accuracy.', 'توقعت الـ Engine البلورات الخمس في الـ Test. اكشف الـ Label الحقيقي لكل واحدة، ثم احسب الـ Accuracy.'],
  ['Count the crystals where the Engine\'s guess matches the true label.', 'عُدّ البلورات التي يطابق فيها توقع الـ Engine الـ Label الحقيقي.'],
  ['Accuracy = correct predictions ÷ all predictions.', 'Accuracy = التوقعات الصحيحة ÷ كل التوقعات.'],
  ['4 correct out of 5 gives 80 percent.', '4 صحيحة من 5 تعطي 80 بالمئة.']);
S('c2.rev.says', 'Engine says: {x}', 'الـ Engine تقول: {x}');
S('c2.rev.btn', 'Reveal label', 'اكشف الـ Label');
S('c2.rev.true', 'True label: {x}', 'الـ Label الحقيقي: {x}');
S('c2.rev.need', 'Reveal all five labels first.', 'اكشف الـ Labels الخمسة أولًا.');
S('c2.rev.q', 'What is the Test accuracy?', 'كم هي الـ Accuracy على الـ Test؟');
S('c2.rev.a', '{k} of 5 = {pct}%', '{k} من 5 = {pct}%');

/* ---------- scene 3 ---------- */
S('c2.t3.title', 'The Hall of Measures', 'The Hall of Measures');
Q('c2.t31', ['Here are the Engine\'s ten predictions on a test. What is its accuracy?', 'هذه توقعات الـ Engine العشرة في اختبار. كم هي الـ Accuracy؟'],
  ['8 of 10 = 80%', '8 من 10 = 80%'], ['2 of 10 = 20%', '2 من 10 = 20%'], ['10 of 10 = 100%', '10 من 10 = 100%'],
  ['Count the correct predictions, the ones with a check mark.', 'عُدّ التوقعات الصحيحة، تلك التي عليها علامة صح.'],
  ['Accuracy = correct ÷ total.', 'Accuracy = الصحيحة ÷ المجموع.'],
  ['Eight of ten are correct, so the accuracy is 80 percent.', 'ثمانية من عشرة صحيحة، إذن الـ Accuracy هي 80 بالمئة.']);
S('c2.t31.row', 'Guess {g} · True {t}', 'التوقع {g} · الحقيقي {t}');
Q('c2.t32', ['This model always says Ruby. On nine rubies and one emerald its accuracy is 90 percent. Is it a good model?', 'هذا الـ Model يقول Ruby دائمًا. على تسع بلورات Ruby وواحدة Emerald تبلغ دقته 90 بالمئة. هل هو Model جيد؟'],
  ['No. It never finds the emerald, so the 90 percent hides a failure.', 'لا. إنه لا يجد الـ Emerald أبدًا، فالـ 90 بالمئة تخفي فشلًا.'], ['Yes. 90 percent is a high score.', 'نعم. 90 بالمئة درجة عالية.'], ['Yes. It never makes a mistake on emeralds.', 'نعم. إنه لا يخطئ أبدًا في الـ Emerald.'],
  ['Look at the table: how many emeralds did it find?', 'انظر إلى الجدول: كم Emerald وجد؟'],
  ['A model that always says one answer can score high when that answer is very common.', 'الـ Model الذي يقول إجابة واحدة دائمًا قد ينال درجة عالية إذا كانت تلك الإجابة شائعة جدًا.'],
  ['It found 0 of 1 emeralds. Accuracy alone hid the problem.', 'وجد 0 من 1 Emerald. الـ Accuracy وحدها أخفت المشكلة.']);
S('c2.cm.title', 'Right and wrong guesses', 'التوقعات الصحيحة والخاطئة');
S('c2.cm.truer', 'True Ruby', 'Ruby الحقيقي');
S('c2.cm.truee', 'True Emerald', 'Emerald الحقيقي');
S('c2.cm.saysr', 'Says Ruby', 'يقول Ruby');
S('c2.cm.sayse', 'Says Emerald', 'يقول Emerald');

/* ---------- scene 4 ---------- */
S('c2.t4.title', 'The Mirror Trial', 'The Mirror Trial');
Q('c2.t41', ['Which model do you trust to handle new crystals?', 'أي Model تثق به للتعامل مع بلورات جديدة؟'],
  ['Model B: its Test score is higher, and close to its Training score.', 'Model B: درجته على الـ Test أعلى، وقريبة من درجته على الـ Training.'], ['Model A: it scored 100 percent on Training.', 'Model A: حصل على 100 بالمئة على الـ Training.'], ['Neither: scores do not matter.', 'لا أحد منهما: الدرجات لا تهم.'],
  ['Which score tells you about crystals the model has never seen?', 'أي درجة تخبرك عن بلورات لم يرها الـ Model أبدًا؟'],
  ['Compare the Test scores, not the Training scores.', 'قارن درجات الـ Test، لا درجات الـ Training.'],
  ['Model B does better on new crystals. A big gap between Training and Test is a warning sign.', 'Model B أفضل على البلورات الجديدة. والفجوة الكبيرة بين Training وTest علامة تحذير.']);
S('c2.models.train', 'Training', 'Training');
S('c2.models.test', 'Test', 'Test');
S('c2.models.a', 'Model A', 'Model A');
S('c2.models.b', 'Model B', 'Model B');
Q('c2.t42', ['Model A scores 100 percent on Training but only 80 percent on Test. What does the gap suggest?', 'يحقق Model A نسبة 100 بالمئة على الـ Training لكن 80 بالمئة فقط على الـ Test. ماذا تقترح هذه الفجوة؟'],
  ['It memorized its Training crystals instead of learning the pattern.', 'لقد حفظ بلورات الـ Training بدل أن يتعلم النمط.'], ['The Test crystals are broken.', 'بلورات الـ Test معطوبة.'], ['It learned the pattern perfectly.', 'لقد تعلّم النمط بشكل كامل.'],
  ['Which crystals does Model A know best?', 'أي البلورات يعرفها Model A أفضل؟'],
  ['Doing great on seen crystals but worse on new ones is the sign of memorizing.', 'التفوق على بلورات رآها والتراجع على الجديدة علامة على الحفظ.'],
  ['A gap like that suggests memorizing, which is called overfitting. A model that scores well on new crystals has generalized.', 'فجوة كهذه تعني الحفظ، ويُسمّى Overfitting. أما الـ Model الذي ينجح على بلورات جديدة فقد حقق Generalization.']);

/* ---------- side quests ---------- */
S('c2.sqT.title', 'A fair test', 'اختبار عادل');
Q('c2.sqT', ['Tess\'s old model: run it on the Test chamber, then decide what she should report.', 'نموذج Tess القديم: شغّله على غرفة الـ Test ثم قرّر ما الذي يجب أن تبلغ به.'],
  ['60 percent, from the Test chamber.', '60 بالمئة، من غرفة الـ Test.'], ['100 percent, from the Training chamber.', '100 بالمئة، من غرفة الـ Training.'], ['80 percent, the average of both.', '80 بالمئة، متوسط الاثنتين.'],
  ['Which chamber holds crystals the model never saw?', 'أي غرفة فيها بلورات لم يرها الـ Model؟'],
  ['Report the score from crystals the model did not train on.', 'أبلغ بالدرجة المأخوذة من بلورات لم يتدرب عليها الـ Model.'],
  ['60 percent. The honest score always comes from unseen crystals.', '60 بالمئة. الدرجة الصادقة تأتي دائمًا من بلورات لم تُرَ من قبل.']);
S('c2.sqT.btn', 'Run on the Test chamber', 'شغّل على غرفة الـ Test');
S('c2.sqT.need', 'Run the model on the Test chamber first.', 'شغّل الـ Model على غرفة الـ Test أولًا.');
S('c2.sqB.title', 'Find the mistake', 'اعثر على الخطأ');
H('c2.sqB', ['Bramm\'s model says Ruby for every crystal. Tap the crystal it gets wrong.', 'نموذج Bramm يقول Ruby لكل بلورة. اضغط على البلورة التي يخطئ فيها.'],
  ['The model always says Ruby. Which crystal is not a Ruby?', 'الـ Model يقول Ruby دائمًا. أي بلورة ليست Ruby؟'],
  ['Look for the single Emerald.', 'ابحث عن الـ Emerald الوحيدة.'],
  ['It misses the only emerald. The 90 percent accuracy hid that mistake.', 'إنه يفوّت الـ Emerald الوحيدة. الـ Accuracy البالغة 90 بالمئة أخفت هذا الخطأ.']);
S('c2.sqB.says', 'Model says: Ruby', 'الـ Model يقول: Ruby');
S('c2.sqP.title', 'Use the Practice chamber', 'استخدم غرفة الـ Practice');
Q('c2.sqP', ['Tess tried three settings on the Practice chamber. Which should she keep, and which chamber stays untouched?', 'جرّبت Tess ثلاثة إعدادات على غرفة الـ Practice. أيها تحتفظ به، وأي غرفة تبقى دون لمس؟'],
  ['Setting B, the best Practice score, and the Test chamber stays sealed.', 'الإعداد B صاحب أفضل درجة في الـ Practice، وتبقى غرفة الـ Test مغلقة.'], ['Setting A, then check it on the Test chamber to be sure.', 'الإعداد A، ثم تفحصه على غرفة الـ Test للتأكد.'], ['Setting C, because the longest name sounds best.', 'الإعداد C، لأن الأرقام الأكبر أفضل.'],
  ['Settings are chosen on the Practice chamber.', 'الإعدادات تُختار في غرفة الـ Practice.'],
  ['The Test chamber is only for the final score.', 'غرفة الـ Test للدرجة النهائية فقط.'],
  ['Setting B has the best Practice score, so keep it. Test stays untouched until the final exam.', 'لدى الإعداد B أفضل درجة في الـ Practice، فاحتفظ به. وتبقى Test دون لمس حتى الامتحان النهائي.']);
S('c2.sqP.row', 'Setting {k}: Practice {n} of 3', 'الإعداد {k}: Practice {n} من 3');

/* ---------- rehearsal ---------- */
S('c2.r.title', 'Workshop Rehearsal', 'تدريب Workshop');
S('c2.r.done', 'Rehearsal complete. You are ready for the academy.', 'اكتمل التدريب. أنت جاهز للأكاديمية.');
S('c2.r.h', 'Think about which crystals the model has already seen.', 'فكّر في البلورات التي رآها الـ Model من قبل.');
S('c2.r.h2', 'A fair score needs unseen crystals and an honest process.', 'الدرجة العادلة تحتاج إلى بلورات لم تُرَ من قبل وإلى عملية صادقة.');
S('c2.r.1', 'Why do we keep a Test chamber the Engine never studies?', 'لماذا نحتفظ بغرفة Test لا تدرسها الـ Engine أبدًا؟');
S('c2.r.1a', 'To get an honest score on crystals it has never seen.', 'للحصول على درجة صادقة على بلورات لم ترها من قبل.');
S('c2.r.1b', 'To make the Engine train faster.', 'لتجعل الـ Engine تتدرب أسرع.');
S('c2.r.1c', 'To give the Engine more crystals to learn from.', 'لتعطي الـ Engine بلورات أكثر لتتعلم منها.');
S('c2.r.ex1', 'The Test chamber exists only to give an honest score on unseen crystals.', 'غرفة الـ Test موجودة فقط لتعطي درجة صادقة على بلورات لم تُرَ من قبل.');
S('c2.r.2', 'What does the Practice chamber help us choose?', 'ماذا تساعدنا غرفة الـ Practice على أن نختار؟');
S('c2.r.2a', 'Settings, such as how detailed the rules are.', 'الإعدادات، مثل مدى تفصيل القواعد.');
S('c2.r.2b', 'The final exam score.', 'درجة الامتحان النهائي.');
S('c2.r.2c', 'Which crystals to delete.', 'أي البلورات نحذف.');
S('c2.r.ex2', 'Practice is for trying settings, so Test stays untouched.', 'الـ Practice لتجربة الإعدادات، وبذلك تبقى Test دون لمس.');
S('c2.r.3', 'A model gets 45 right out of 50 predictions. What is its accuracy?', 'حصل Model على 45 توقعًا صحيحًا من 50. كم هي الـ Accuracy؟');
S('c2.r.3a', '90 percent', '90 بالمئة');
S('c2.r.3b', '45 percent', '45 بالمئة');
S('c2.r.3c', '50 percent', '50 بالمئة');
S('c2.r.ex3', '45 ÷ 50 = 0.9, which is 90 percent.', '45 ÷ 50 = 0.9، أي 90 بالمئة.');
S('c2.r.4', 'A model scores 100 percent on Training and 60 percent on Test. What is the best description?', 'ينال Model نسبة 100 بالمئة على الـ Training و60 بالمئة على الـ Test. ما أفضل وصف؟');
S('c2.r.4a', 'It probably memorized its Training crystals.', 'من المرجح أنه حفظ بلورات الـ Training.');
S('c2.r.4b', 'It generalized perfectly.', 'لقد حقق Generalization كاملة.');
S('c2.r.4c', 'The Test crystals must be wrong.', 'لا بد أن بلورات الـ Test خاطئة.');
S('c2.r.ex4', 'A big gap between Training and Test suggests memorizing, which is overfitting.', 'الفجوة الكبيرة بين Training وTest تعني الحفظ، وهو Overfitting.');
S('c2.r.5', 'A model scores 95 percent because the Test labels were in its Training table. What is this called?', 'ينال Model نسبة 95 بالمئة لأن Labels الـ Test كانت في جدول الـ Training. ماذا يُسمّى هذا؟');
S('c2.r.5a', 'Data leakage', 'Data leakage');
S('c2.r.5b', 'Generalization', 'Generalization');
S('c2.r.5c', 'Accuracy', 'Accuracy');
S('c2.r.ex5', 'Test information leaked into training, so the score is not honest.', 'تسرّبت معلومات الـ Test إلى التدريب، فالدرجة ليست صادقة.');

/* ---------- boss: cheater ---------- */
Q('q2.1', ['Cheater\'s classifier scores 100 percent on the Test chamber. What should you ask first?', 'مصنّف Cheater يحقق 100 بالمئة على غرفة الـ Test. ما أول سؤال تطرحه؟'],
  ['Did any Test crystals or labels get into training?', 'هل دخلت بلورات أو Labels من الـ Test إلى التدريب؟'], ['Can the score reach 110 percent?', 'هل يمكن أن تصل الدرجة إلى 110 بالمئة؟'], ['Which crystal is the prettiest?', 'أي بلورة هي الأجمل؟'],
  ['A perfect score is surprising. What could make a score too good?', 'الدرجة الكاملة مفاجئة. ما الذي قد يجعلها أحسن من اللازم؟'],
  ['Check how the score was produced before trusting it.', 'افحص كيف نتجت الدرجة قبل أن تثق بها.'],
  ['Always ask first whether the Test data stayed unseen.', 'اسأل دائمًا أولًا إن كانت بيانات الـ Test بقيت غير مرئية.']);
Q('q2.2', ['The Test labels were copied into the Training table. What does the 100 percent score tell us now?', 'نُسخت Labels الـ Test إلى جدول الـ Training. ماذا تخبرنا درجة الـ 100 بالمئة الآن؟'],
  ['Nothing reliable: the model saw the answers.', 'لا شيء موثوقًا: الـ Model رأى الإجابات.'], ['That the model generalizes perfectly.', 'أن الـ Model يحقق Generalization كاملة.'], ['That the Test chamber was too easy.', 'أن غرفة الـ Test كانت سهلة جدًا.'],
  ['What did the model see while it was learning?', 'ماذا رأى الـ Model أثناء تعلّمه؟'],
  ['If it saw the answers, the exam did not test it.', 'إن رأى الإجابات فالامتحان لم يختبره.'],
  ['A score from leaked answers measures memory, not learning.', 'درجة من إجابات مسرّبة تقيس الذاكرة لا التعلم.']);
H('q2.3', ['Cheater\'s second model says Ruby for every crystal. Tap the crystals it gets wrong.', 'نموذج Cheater الثاني يقول Ruby لكل بلورة. اضغط على البلورات التي يخطئ فيها.'],
  ['The model always says Ruby. Which crystals are not Rubies?', 'الـ Model يقول Ruby دائمًا. أي البلورات ليست Ruby؟'],
  ['Every Emerald is a mistake.', 'كل Emerald خطأ.'],
  ['It misses every emerald, so its accuracy alone hides the problem.', 'إنه يفوّت كل Emerald، فالـ Accuracy وحدها تخفي المشكلة.']);
H('q2.4', ['Here is Cheater\'s pipeline. Tap every step that lets Test information into training.', 'هذا هو Pipeline الخاص بـ Cheater. اضغط على كل خطوة تُدخل معلومات الـ Test إلى التدريب.'],
  ['Look for steps that use the Test chamber before the final exam.', 'ابحث عن الخطوات التي تستخدم غرفة الـ Test قبل الامتحان النهائي.'],
  ['Leaks: Test labels in training, Test numbers used to prepare data, and the Test score used to tune settings.', 'التسريبات: Labels الـ Test في التدريب، وأرقام الـ Test المستخدمة لتجهيز البيانات، ودرجة الـ Test المستخدمة لضبط الإعدادات.'],
  ['Steps 1, 4 and 5 all let Test information shape the model before the exam.', 'الخطوات 1 و4 و5 كلها تسمح لمعلومات الـ Test بتشكيل الـ Model قبل الامتحان.']);
S('q2.4.s1', 'Scale crystal sizes using the average of ALL crystals, including the Test chamber.', 'عدّل مقاييس الأحجام باستخدام متوسط كل البلورات، بما فيها غرفة الـ Test.');
S('q2.4.s2', 'Split the crystals into Training and Test.', 'قسّم البلورات إلى Training وTest.');
S('q2.4.s3', 'Train the Engine on the Training chamber.', 'درّب الـ Engine على غرفة الـ Training.');
S('q2.4.s4', 'Choose the best settings by checking the Test score again and again.', 'اختر أفضل الإعدادات بفحص درجة الـ Test مرارًا.');
S('q2.4.s5', 'Add the Test labels to the Training table to help the Engine.', 'أضف Labels الـ Test إلى جدول الـ Training لمساعدة الـ Engine.');
S('q2.4.s6', 'Report the Test score once, at the end.', 'أبلغ بدرجة الـ Test مرة واحدة، في النهاية.');
H('q2.5', ['Six crystals are waiting. Tap every crystal that is fair for the Engine to study while it trains.', 'ست بلورات تنتظر. اضغط على كل بلورة يجوز للـ Engine أن تدرسها أثناء التدريب.'],
  ['Only the Training chamber is for learning.', 'غرفة الـ Training وحدها للتعلم.'],
  ['A copy of a Test crystal in the Training pile also leaks its answer.', 'نسخة من بلورة Test داخل كومة الـ Training تسرّب إجابتها أيضًا.'],
  ['Only fresh Training crystals are fair. Practice is for settings, Test is sealed, and a copy of a Test crystal leaks its answer.', 'بلورات الـ Training الجديدة وحدها العادلة. الـ Practice للإعدادات، والـ Test مغلقة، ونسخة من بلورة Test تسرّب إجابتها.']);
S('q2.5.lt', 'from the Training chamber', 'من غرفة الـ Training');
S('q2.5.lp', 'from the Practice chamber', 'من غرفة الـ Practice');
S('q2.5.lx', 'from the Test chamber', 'من غرفة الـ Test');
S('q2.5.ld', 'in the Training pile, but an exact copy of a Test crystal', 'في كومة الـ Training، لكنها نسخة مطابقة لبلورة Test');
H('q2.6', ['The Engine made these predictions on 8 Test crystals. Tap the wrong predictions, then think about the accuracy.', 'قدّمت الـ Engine هذه التوقعات على 8 بلورات Test. اضغط على التوقعات الخاطئة، ثم فكّر في الـ Accuracy.'],
  ['A prediction is wrong when the guess and the true label differ.', 'يكون التوقع خاطئًا عندما يختلف التوقع عن الـ Label الحقيقي.'],
  ['Two predictions are wrong, so six of eight are right.', 'توقعان خاطئان، إذن ستة من ثمانية صحيحة.'],
  ['Two are wrong, so 6 of 8 are correct: the accuracy is 75 percent.', 'توقعان خاطئان، إذن 6 من 8 صحيحة: الـ Accuracy هي 75 بالمئة.']);
Q('q2.7', ['An apprentice chose a setting by checking the Test score for Setting A, B and C, and kept the best. What went wrong?', 'اختار متدرّب إعدادًا بفحص درجة الـ Test لكل من الإعداد A وB وC واحتفظ بالأفضل. ما الخطأ؟'],
  ['The Test chamber was used to tune settings, so its score is no longer honest. Use Practice.', 'استُخدمت غرفة الـ Test لضبط الإعدادات، فلم تعد درجتها صادقة. استخدم Practice.'], ['Nothing: checking more settings is always better.', 'لا شيء: فحص المزيد من الإعدادات أفضل دائمًا.'], ['The setting should have been picked at random.', 'كان يجب اختيار الإعداد عشوائيًا.'],
  ['Which chamber is meant for trying settings?', 'أي غرفة مخصصة لتجربة الإعدادات؟'],
  ['Using Test to choose settings lets the Test answers shape the model.', 'استخدام الـ Test لاختيار الإعدادات يجعل إجابات الـ Test تشكّل الـ Model.'],
  ['Settings belong to the Practice chamber. Once Test guides the choice, it stops being an honest exam.', 'الإعدادات مكانها غرفة الـ Practice. وحين توجّه Test الاختيار تتوقف عن أن تكون امتحانًا صادقًا.']);
H('q2.8', ['Put the honest evaluation steps in the correct order. Tap them in order.', 'رتّب خطوات التقييم الصادق بالترتيب الصحيح. اضغط عليها بالترتيب.'],
  ['What must happen first, so no chamber is contaminated?', 'ما الذي يجب أن يحدث أولًا حتى لا تتلوث أي غرفة؟'],
  ['Split first, prepare using Training only, then choose settings, then test once.', 'قسّم أولًا، ثم جهّز البيانات باستخدام Training فقط، ثم اختر الإعدادات، ثم اختبر مرة واحدة.'],
  ['Split first, prepare on Training only, tune on Practice, test once.', 'قسّم أولًا، وجهّز على Training فقط، واضبط على Practice، واختبر مرة واحدة.']);
S('q2.8.s1', 'Split into Training, Practice and Test', 'قسّم إلى Training وPractice وTest');
S('q2.8.s2', 'Prepare the data using the Training chamber only', 'جهّز البيانات باستخدام غرفة الـ Training فقط');
S('q2.8.s3', 'Train, and choose settings with Practice', 'درّب، واختر الإعدادات بواسطة Practice');
S('q2.8.s4', 'Report the Test score once', 'أبلغ بدرجة الـ Test مرة واحدة');
S('q2.8.order', 'Order: {x}', 'الترتيب: {x}');
H('q2.9', ['Cheater peeked at one column of the Test table. Which column holds the answers? Tap it.', 'اطّلع Cheater على عمود واحد من جدول الـ Test. أي عمود يحمل الإجابات؟ اضغط عليه.'],
  ['In Learning Meadows, which column did the model have to predict?', 'في Learning Meadows، أي عمود كان على الـ Model أن يتوقعه؟'],
  ['Features describe the crystal. The label is the answer.', 'الـ Features تصف البلورة. والـ Label هو الإجابة.'],
  ['The Label column is the answer. Seeing it early ruins the test.', 'عمود الـ Label هو الإجابة. رؤيته مبكرًا تفسد الاختبار.']);
Q('q2.10', ['Even a sealed Test chamber can mislead if some of its labels are wrong, like Misprint\'s stamps. What happens to an honest accuracy score?', 'حتى غرفة Test مغلقة قد تضلّل إن كانت بعض الـ Labels فيها خاطئة، مثل أختام Misprint. ماذا يحدث لدرجة Accuracy صادقة؟'],
  ['It can be too low or too high, because the answers are not all right.', 'قد تكون أقل أو أعلى من الحقيقة، لأن الإجابات ليست كلها صحيحة.'], ['Nothing: wrong labels never matter in the Test chamber.', 'لا شيء: الـ Labels الخاطئة لا تهم أبدًا في غرفة الـ Test.'], ['The score becomes exactly 100 percent.', 'تصبح الدرجة 100 بالمئة بالضبط.'],
  ['Remember Misprint\'s stamped records.', 'تذكّر سجلات Misprint المختومة.'],
  ['The score compares predictions with the labels. What if a label is wrong?', 'تقارن الدرجة بين التوقعات والـ Labels. ماذا لو كان أحد الـ Labels خاطئًا؟'],
  ['A fair test needs unseen crystals and trustworthy labels.', 'الاختبار العادل يحتاج إلى بلورات لم تُرَ من قبل وإلى Labels موثوقة.']);
S('q2.col', 'Test table column', 'عمود في جدول الـ Test');

/* ---------- codex ---------- */
CODEX.push('split', 'accuracy', 'gen', 'leak', 'fairtest', 'valid', 'trap', 'cm');
S('cx.split.term', 'Train/test split', 'Train/test split');
S('cx.split.body', 'Divide your examples into a Training set to learn from and a Test set kept sealed until the final exam. Test examples must be ones the model has never seen.', 'قسّم أمثلتك إلى Training set للتعلم منها، وTest set تبقى مغلقة حتى الامتحان النهائي. يجب أن تكون أمثلة الـ Test لم يرها الـ Model من قبل.');
S('cx.accuracy.term', 'Accuracy', 'Accuracy');
S('cx.accuracy.body', 'The share of predictions that are correct: correct ÷ total. Useful, but it can hide missed cases.', 'نسبة التوقعات الصحيحة: الصحيحة ÷ المجموع. مفيدة، لكنها قد تخفي حالات فائتة.');
S('cx.gen.term', 'Generalization and overfitting', 'Generalization و Overfitting');
S('cx.gen.body', 'A model generalizes when it does well on new examples. If it shines on its Training examples but not on new ones, it has memorized them. This is called overfitting.', 'يحقق الـ Model Generalization حين ينجح على أمثلة جديدة. وإن تألق على أمثلة الـ Training دون الجديدة فقد حفظها. وهذا يُسمّى Overfitting.');
S('cx.leak.term', 'Data leakage', 'Data leakage');
S('cx.leak.body', 'When information from the Test set, such as its answers or numbers computed from it, gets into training. The score looks great but is not honest.', 'حين تدخل معلومات من الـ Test set، مثل إجاباتها أو أرقام محسوبة منها، إلى التدريب. تبدو الدرجة رائعة لكنها ليست صادقة.');
S('cx.fairtest.term', 'A score needs a fair test', 'الدرجة تحتاج إلى اختبار عادل');
S('cx.fairtest.body', 'Report the score from examples the model never trained on, not the score from its own Training examples.', 'أبلغ بدرجة من أمثلة لم يتدرب عليها الـ Model، لا بدرجة أمثلة الـ Training الخاصة به.');
S('cx.valid.term', 'Validation set (Practice)', 'Validation set (Practice)');
S('cx.valid.body', 'A separate set used to choose settings, so the Test set stays untouched until the final exam.', 'مجموعة منفصلة تُستخدم لاختيار الإعدادات، فتبقى الـ Test set دون لمس حتى الامتحان النهائي.');
S('cx.trap.term', 'The accuracy trap', 'فخ الـ Accuracy');
S('cx.trap.body', 'If one answer is very common, a model that always guesses it can score high while missing the rare cases.', 'إذا كانت إجابة ما شائعة جدًا فقد ينال Model يخمّنها دائمًا درجة عالية وهو يفوّت الحالات النادرة.');
S('cx.cm.term', 'Confusion table', 'Confusion table');
S('cx.cm.body', 'A table of right and wrong guesses for each class. It shows which mistakes accuracy hides.', 'جدول للتوقعات الصحيحة والخاطئة لكل فئة. يُظهر الأخطاء التي تخفيها الـ Accuracy.');
