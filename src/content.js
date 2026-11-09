'use strict';
/* ===== content.js: all text (EN + AR), maps and teaching data for Chapter 1 ===== */

/* ---------- UI ---------- */
S('ui.title', 'Machine Legends', 'Machine Legends');
S('ui.sub', 'Chapter 1: Learning Meadows', 'الفصل الأول: Learning Meadows');
S('ui.choose', 'Choose your language / اختر لغتك', 'Choose your language / اختر لغتك');
S('ui.new', 'New Game', 'لعبة جديدة');
S('ui.continue', 'Continue', 'متابعة');
S('ui.settings', 'Settings', 'الإعدادات');
S('ui.resume', 'Resume', 'العودة للعبة');
S('ui.codex', 'Codex', 'Codex');
S('ui.journal', 'Journal', 'Journal');
S('ui.quit', 'Back to title', 'العودة للشاشة الرئيسية');
S('ui.close', 'Close', 'إغلاق');
S('ui.hint', 'Hint', 'تلميح');
S('ui.skip', 'Skip', 'تخطي');
S('ui.next', 'Next', 'التالي');
S('ui.check', 'Check', 'تحقق');
S('ui.finish', 'Finish', 'إنهاء');
S('ui.again', 'Try again', 'حاول مرة أخرى');
S('ui.pause', 'Paused', 'إيقاف مؤقت');
S('ui.confirmNew', 'Start a new game? Your saved progress will be replaced.', 'هل تريد بدء لعبة جديدة؟ سيتم استبدال تقدمك المحفوظ.');
S('ui.yes', 'Yes', 'نعم');
S('ui.no', 'No', 'لا');
S('ui.controls', 'Move: arrow keys or WASD. Talk: Space or Enter. Menu: Esc.', 'الحركة: مفاتيح الأسهم أو WASD. التحدث: Space أو Enter. القائمة: Esc.');
S('ui.xp', 'XP', 'XP');
S('ui.frag', 'Core Fragments', 'Core Fragments');
S('ui.obj', 'Objective', 'الهدف');
S('ui.empty', 'Nothing here yet.', 'لا يوجد شيء هنا بعد.');
S('ui.nodata', 'Nothing to show.', 'لا يوجد ما يعرض.');

/* settings */
S('set.lang', 'Language', 'اللغة');
S('set.sound', 'Sound and music', 'الصوت والموسيقى');
S('set.master', 'Master volume', 'مستوى الصوت العام');
S('set.music', 'Music volume', 'مستوى الموسيقى');
S('set.sfx', 'Sound effects volume', 'مستوى المؤثرات الصوتية');
S('set.blip', 'Dialogue blips volume', 'مستوى أصوات الحوار');
S('set.mute', 'Mute', 'كتم');
S('set.boss', 'Boss music', 'موسيقى الزعيم');
S('set.boss.full', 'Full', 'كاملة');
S('set.boss.calm', 'Calm', 'هادئة');
S('set.boss.off', 'Off', 'متوقفة');
S('set.captions', 'Sound captions', 'وصف الأصوات كتابيًا');
S('set.display', 'Text and display', 'النص والعرض');
S('set.speed', 'Text speed', 'سرعة النص');
S('set.speed.slow', 'Slow', 'بطيئة');
S('set.speed.normal', 'Normal', 'عادية');
S('set.speed.instant', 'Instant', 'فورية');
S('set.size', 'Text size', 'حجم النص');
S('set.size.s', 'Small', 'صغير');
S('set.size.m', 'Medium', 'متوسط');
S('set.size.l', 'Large', 'كبير');
S('set.contrast', 'High contrast', 'تباين عالٍ');
S('set.motion', 'Reduce motion', 'تقليل الحركة');
S('set.on', 'On', 'تشغيل');
S('set.off', 'Off', 'إيقاف');
S('set.note', 'Settings save on this device and apply immediately.', 'تُحفظ الإعدادات على هذا الجهاز وتُطبَّق فورًا.');

/* captions and toasts */
S('cap.click', '[click]', '[نقرة]');
S('cap.ok', '[chime]', '[نغمة نجاح]');
S('cap.no', '[low buzz]', '[طنين منخفض]');
S('cap.door', '[door opens]', '[يُفتح الباب]');
S('cap.gate', '[gate opens]', '[تُفتح البوابة]');
S('cap.fragment', '[fragment glows]', '[تتوهج القطعة]');
S('cap.train', '[machine powers up]', '[تعمل الآلة]');
S('toast.codex', 'Codex unlocked: {term}', 'تم فتح مدخل في Codex: {term}');
S('toast.xp', '+{n} XP', '+{n} XP');
S('toast.frag', 'Core Fragment 1 recovered', 'تم استرداد Core Fragment 1');
S('toast.quest', 'New side quest: {name}', 'مهمة جانبية جديدة: {name}');
S('toast.saved', 'Progress saved', 'تم حفظ التقدم');
S('lock.gate', 'The gate is locked. Elder Finch is waiting nearby.', 'البوابة مغلقة. Elder Finch ينتظر قريبًا.');
S('lock.door', 'The training center is not ready yet. The records need Features and Labels first.', 'مركز التدريب غير جاهز بعد. تحتاج السجلات إلى Features و Labels أولًا.');
S('lock.stairs', 'The stairs are dark. Maybe Elder Finch can tell us more.', 'الدرج مظلم. ربما يستطيع Elder Finch إخبارنا بالمزيد.');
S('tile.T', "Luma's records station. Papers and pens everywhere.", 'محطة السجلات الخاصة بـ Luma. أوراق وأقلام في كل مكان.');
S('tile.B', 'Crates of fruit. Some have records, some are blank.', 'صناديق فاكهة. بعضها له سجلات وبعضها فارغ.');
S('tile.S', 'Shelves of old records, stamped long ago.', 'رفوف من السجلات القديمة، ختمت منذ زمن بعيد.');
S('tile.H', 'A quiet house.', 'منزل هادئ.');
S('tile.M', 'The training center machine. It hums softly.', 'آلة مركز التدريب. تُصدر طنينًا خافتًا.');

/* names */
S('spk.milo', 'MILO', 'MILO');
S('spk.you', 'You', 'أنت');
S('spk.finch', 'Elder Finch', 'Elder Finch');
S('spk.pip', 'Pip', 'Pip');
S('spk.luma', 'Luma', 'Luma');
S('spk.wren', 'Archivist Wren', 'Archivist Wren');
S('spk.misprint', 'Misprint', 'Misprint');
S('spk.model', 'Model screen', 'شاشة الـ Model');
S('spk.none', '', '');

/* objectives */
S('obj.finch', 'Speak with Elder Finch at the gate.', 'تحدّث مع Elder Finch عند البوابة.');
S('obj.yard', 'Go through the gate to the Harvest Yard.', 'اعبر البوابة إلى Harvest Yard.');
S('obj.luma2', 'Talk to Luma in the Harvest Yard.', 'تحدّث مع Luma في Harvest Yard.');
S('obj.luma3', 'Talk to Luma again to prepare the records.', 'تحدّث مع Luma مجددًا لتجهيز السجلات.');
S('obj.training', 'Enter the training center (the building at the top right).', 'ادخل مركز التدريب (المبنى في أعلى اليمين).');
S('obj.machine', 'Use the training machine.', 'استخدم آلة التدريب.');
S('obj.stairs', 'Take the stairs down to the Harvest Archive.', 'انزل الدرج إلى Harvest Archive.');
S('obj.boss', 'Speak with Misprint.', 'تحدّث مع Misprint.');
S('obj.done', 'Chapter complete. Explore or finish side quests.', 'اكتمل الفصل. استكشف أو أنهِ المهام الجانبية.');

/* ---------- Prologue ---------- */
S('p.1', 'Systems... partially... hello? Do you know where we are? Neither do I.', 'الأنظمة... جزئيًا... مرحبًا؟ هل تعرف أين نحن؟ أنا أيضًا لا أعرف.');
S('p.2', "I'm not sure. Are you okay?", 'لا أدري. هل أنت بخير؟');
S('p.3', "I'm missing a few memories, but my legs work. Let's find someone who knows something.", 'ذاكرتي ناقصة قليلًا، لكن ساقيّ تعملان. لنبحث عن شخص يعرف شيئًا.');
S('p.mark0', 'The Ancient Mark on the gate glows softly.', 'تتوهج العلامة القديمة على البوابة بهدوء.');
S('p.mark', 'I have seen that mark. I just cannot say where.', 'لقد رأيت هذه العلامة من قبل. لكنني لا أتذكر أين.');

/* ---------- Pip ---------- */
S('pip.1', 'I made a rule for every fruit! Purple means grape. No, wait... plum? Maybe pear?', 'صنعت قاعدة لكل فاكهة! البنفسجي يعني عنب. لا، انتظر... برقوق؟ ربما كمثرى؟');
S('pip.2', 'My rulebook keeps growing. Can you check which of my rules go wrong?', 'كتاب قواعدي يكبر باستمرار. هل تتحقق من القواعد التي تخطئ؟');
S('pip.3', 'Writing a rule for everything is tiring. Examples are much easier!', 'كتابة قاعدة لكل شيء مرهقة. الأمثلة أسهل بكثير!');
S('pip.sq', "Pip's Rulebook", 'Pip’s Rulebook');
S('pip.opt', "Side quest: Pip's Rulebook", 'مهمة جانبية: Pip’s Rulebook');

/* ---------- Scene 1: The Rulebound Gate ---------- */
S('f1.1', 'Stop! The gate is not working. We have a serious problem.', 'توقفوا! البوابة لا تعمل. لدينا مشكلة خطيرة.');
S('f1.2', 'What happened?', 'ماذا حدث؟');
S('f1.3', 'The fruit-recognition system rejected this fruit. I wrote every rule I know, but I never expected a fruit with this color.', 'نظام التعرف على الفاكهة رفض هذه الثمرة. كتبت كل القواعد التي أعرفها، لكنني لم أتوقع ثمرة بهذا اللون.');
S('f1.4', 'It seems the system only knows what it has been explicitly told.', 'يبدو أن النظام لا يعرف إلا ما قيل له صراحة.');
S('f1.5', 'Exactly. Should I write another rule? If the fruit is purple, perhaps it belongs to a new type.', 'بالضبط. هل أكتب قاعدة أخرى؟ إذا كانت الثمرة بنفسجية، فربما تنتمي إلى نوع جديد.');
S('f1.6', 'What if another purple fruit appears? Would you need another rule?', 'ماذا لو ظهرت ثمرة بنفسجية أخرى؟ هل ستحتاج إلى قاعدة جديدة؟');
S('f1.7', 'That is the limit of rule-based programming: we write every rule ourselves.', 'هذا هو حدّ البرمجة المعتمدة على القواعد: نحن نكتب كل قاعدة بأنفسنا.');
S('f1.8', 'Can a machine learn on its own? How could it learn?', 'هل تستطيع الآلة أن تتعلم بنفسها؟ كيف يمكنها ذلك؟');
S('f1.9', 'Instead of writing a rule for every fruit, we can show it many examples and help it learn patterns that support predictions.', 'بدلًا من كتابة قاعدة لكل ثمرة، يمكننا أن نريها أمثلة كثيرة ونساعدها على تعلّم أنماط تدعم التنبؤات.');
S('f1.win', 'Then let us try it. I will prepare examples for training.', 'إذن لنجرّب ذلك. سأجهّز أمثلة للتدريب.');
S('f1.t1', 'The gate is open! But we do not have enough examples to train this model.', 'البوابة مفتوحة! لكن ليس لدينا أمثلة كافية لتدريب هذا النموذج.');
S('f1.t2', 'Then we need to collect more fruit.', 'إذن نحتاج إلى جمع المزيد من الفاكهة.');
S('f1.t3', 'Before we collect it, we should decide what counts as data and how to organize it.', 'قبل أن نجمعها، يجب أن نقرر ما الذي يُعدّ بيانات (Data) وكيف ننظمها.');
S('f1.t4', 'We will need the records from the Harvest Yard.', 'سنحتاج إلى السجلات من Harvest Yard.');
S('f1.idle', 'The gate is open now. The Harvest Yard is just beyond it.', 'البوابة مفتوحة الآن. Harvest Yard خلفها مباشرة.');
S('f1.idle2', 'Come back to me when you want a practice round.', 'عد إليّ عندما تريد جولة تدريب.');
S('f1.reh', 'Practice round: ask Finch', 'جولة تدريب: اسأل Finch');
S('f1.talk', 'Just talk', 'مجرد حديث');

/* Activity 1 */
S('a1.title', 'Two ways to fix the gate', 'طريقتان لإصلاح البوابة');
S('a1.rules', 'The gate rules', 'قواعد البوابة');
S('a1.r1', 'If red and round → Apple', 'إذا كانت حمراء ودائرية ← تفاحة');
S('a1.r2', 'If yellow and long → Banana', 'إذا كانت صفراء وطويلة ← موز');
S('a1.r3', 'If orange → Orange', 'إذا كانت برتقالية ← برتقال');
S('a1.r4', 'If purple → Plum', 'إذا كانت بنفسجية ← برقوق');
S('a1.prompt', 'The gate rejected this purple fruit. How should we fix the gate?', 'رفضت البوابة هذه الثمرة البنفسجية. كيف نصلح البوابة؟');
S('a1.optRule', 'Add one more rule: purple means Plum', 'نضيف قاعدة أخرى: البنفسجي يعني برقوق');
S('a1.optEx', 'Show it many labeled examples and let it learn', 'نريها أمثلة كثيرة معنونة (Labeled) ونتركها تتعلم');
S('a1.fruitA', 'Purple fruit A', 'ثمرة بنفسجية A');
S('a1.fruitB', 'Lighter purple fruit B', 'ثمرة بنفسجية فاتحة B');
S('a1.rejected', 'Rejected: unknown fruit', 'مرفوضة: ثمرة غير معروفة');
S('a1.accepted', 'Accepted: {x}', 'مقبولة: {x}');
S('a1.afterRule', 'The new rule fixed fruit A, but a lighter purple fruit B has just arrived and the gate rejects it again.', 'القاعدة الجديدة أصلحت الثمرة A، لكن وصلت للتو ثمرة بنفسجية فاتحة B والبوابة ترفضها مرة أخرى.');
S('a1.exTitle', 'Labeled examples', 'أمثلة معنونة');
S('a1.learned', 'The learner compared both fruits with its examples and classified them without any new rule.', 'قارن المتعلّم الثمرتين بأمثلته وصنّفهما دون أي قاعدة جديدة.');
S('a1.h1', 'Think about what happens when another unfamiliar fruit arrives.', 'فكّر فيما يحدث عندما تصل ثمرة جديدة غير مألوفة.');
S('a1.h2', 'A rule patches one case. Examples can teach a pattern that fits many cases.', 'القاعدة تُصلح حالة واحدة. أما الأمثلة فتعلّم نمطًا يناسب حالات كثيرة.');
S('a1.ex', 'Rules cover only the cases we imagined. Examples let a model learn patterns that also fit new cases.', 'القواعد تغطي فقط الحالات التي تخيلناها. الأمثلة تتيح للنموذج تعلّم أنماط تناسب الحالات الجديدة أيضًا.');
S('a1.go', 'Use the learner', 'استخدم المتعلّم');

/* ---------- Scene 2: The Empty Harvest ---------- */
S('f2.1', 'I heard you repaired the village gate, but I have another problem.', 'سمعت أنكما أصلحتما بوابة القرية، لكن لدي مشكلة أخرى.');
S('f2.2', 'What is the problem this time?', 'ما المشكلة هذه المرة؟');
S('f2.3', 'Elder Finch asked me to prepare data for training the model. I collected only three fruits, but he said that was not enough.', 'طلب مني Elder Finch تجهيز بيانات لتدريب النموذج. جمعت ثلاث ثمرات فقط، لكنه قال إن ذلك لا يكفي.');
S('f2.4', 'Did you collect those fruits randomly, or do they represent the kinds of fruit the model may meet later?', 'هل جمعت هذه الثمار عشوائيًا، أم أنها تمثل أنواع الفاكهة التي قد يقابلها النموذج لاحقًا؟');
S('f2.5', 'I do not understand. Are these fruits not data?', 'لم أفهم. أليست هذه الثمار بيانات؟');
S('f2.6', 'Yes. But when we record information about one fruit, we have one **Sample**.', 'بلى. لكن عندما نسجّل معلومات عن ثمرة واحدة، يكون لدينا Sample واحدة.');
S('f2.7', 'What if we collect many samples?', 'ماذا لو جمعنا عينات كثيرة؟');
S('f2.8', 'When we collect and organize them, we have a **Dataset**.', 'عندما نجمعها وننظمها، يصبح لدينا Dataset.');
S('f2.9', 'Then we should gather and organize more examples before training.', 'إذن علينا جمع وتنظيم المزيد من الأمثلة قبل التدريب.');
S('f2.win', 'The boxes are organized now. We can finally describe each fruit properly.', 'أصبحت الصناديق منظمة الآن. يمكننا أخيرًا وصف كل ثمرة بشكل صحيح.');
S('f2.t1', 'We have collected many records, but I do not know what information to write about each fruit.', 'جمعنا سجلات كثيرة، لكنني لا أعرف ما المعلومات التي أكتبها عن كل ثمرة.');
S('f2.t2', "Would recording the fruit's color and size be enough?", 'هل يكفي تسجيل لون الثمرة وحجمها؟');
S('f2.t3', 'Those details are useful, but we also need to know what answer we want the model to learn to predict.', 'هذه التفاصيل مفيدة، لكننا نحتاج أيضًا إلى معرفة الإجابة التي نريد أن يتعلم النموذج التنبؤ بها.');
S('f2.t4', 'So we need to describe each fruit and identify its type.', 'إذن علينا وصف كل ثمرة وتحديد نوعها.');
S('f2.t5', 'Exactly. We need **Features** and **Labels**.', 'بالضبط. نحتاج إلى Features و Labels.');
S('f2.wait', 'Come back after the gate is open. Elder Finch can help.', 'عُد بعد فتح البوابة. يستطيع Elder Finch مساعدتك.');
S('a2.t1', 'Task 1: Find the single sample', 'المهمة 1: ابحث عن الـ Sample الواحدة');
S('a2.q1', 'Which one is a single sample?', 'أي واحد منها هو Sample واحدة؟');
S('a2.o1a', 'One record describing a single fruit', 'سجل واحد يصف ثمرة واحدة');
S('a2.o1b', 'A whole box of fruit records', 'صندوق كامل من سجلات الفاكهة');
S('a2.o1c', 'The name of the weight column', 'اسم عمود الوزن');
S('a2.h1', 'A sample is a single example, not the whole collection.', 'الـ Sample مثال واحد وليست المجموعة كلها.');
S('a2.h2', 'Which choice is one record about one fruit?', 'أي خيار هو سجل واحد عن ثمرة واحدة؟');
S('a2.ex', 'A sample is one record describing one fruit. A dataset is an organized collection of many samples.', 'الـ Sample سجل واحد يصف ثمرة واحدة. أما الـ Dataset فهي مجموعة منظمة من عدد كبير من الـ Samples.');
S('a2.t2', 'Task 2: Build the dataset', 'المهمة 2: ابنِ الـ Dataset');
S('a2.q2', 'Tap loose records to put them in the dataset box. A dataset needs many samples (at least 6).', 'المس السجلات المبعثرة لوضعها في صندوق الـ Dataset. تحتاج الـ Dataset إلى عينات كثيرة (6 على الأقل).');
S('a2.box', 'Dataset box: {n} samples', 'صندوق الـ Dataset: {n} عينات');
S('a2.few', 'The box has only {n} samples. A model needs many examples to learn from.', 'يحتوي الصندوق على {n} عينات فقط. يحتاج النموذج إلى أمثلة كثيرة ليتعلم منها.');
S('a2.h3', 'One sample is a single fruit. A dataset is many samples together.', 'الـ Sample ثمرة واحدة. أما الـ Dataset فهي عينات كثيرة معًا.');
S('a2.h4', 'Keep adding records until the box holds at least 6 samples.', 'استمر في إضافة السجلات حتى يحتوي الصندوق على 6 عينات على الأقل.');
S('a2.ex2', 'Tap more records. A dataset is an organized collection of many samples, so we need several in the box.', 'المس سجلات أخرى. الـ Dataset مجموعة منظمة من عينات كثيرة، لذا نحتاج إلى عدة سجلات في الصندوق.');

/* ---------- Scene 3: The Missing Answer ---------- */
S('f3.1', 'I have collected all the fruit records, but the training center will not accept them.', 'جمعت كل سجلات الفاكهة، لكن مركز التدريب لا يقبلها.');
S('f3.2', 'What is missing?', 'ما الذي ينقصها؟');
S('f3.3', "I recorded each fruit's color, weight, and shape.", 'سجلت لون كل ثمرة ووزنها وشكلها.');
S('f3.4', 'Those are useful details, but they do not tell us the answer we want the model to predict.', 'هذه تفاصيل مفيدة، لكنها لا تخبرنا بالإجابة التي نريد من النموذج أن يتنبأ بها.');
S('f3.5', 'You mean we know what the fruit looks like, but not what type it is?', 'تقصد أننا نعرف شكل الثمرة، لكننا لا نعرف نوعها؟');
S('f3.6', 'Exactly. The details we use to describe a sample are called **Features**. The correct answer we want the model to predict is called the **Label**.', 'بالضبط. التفاصيل التي نصف بها الـ Sample تسمى Features. أما الإجابة الصحيحة التي نريد من النموذج التنبؤ بها فتسمى Label.');
S('f3.7', 'So color, weight, and shape are Features, and the fruit type is the Label.', 'إذن اللون والوزن والشكل هي Features، ونوع الثمرة هو الـ Label.');
S('f3.8', 'Correct. Remember that choosing suitable features matters. Not every piece of information is useful for the task.', 'صحيح. تذكّر أن اختيار Features مناسبة مهم. ليست كل معلومة مفيدة للمهمة.');
S('f3.9', 'Let us complete the records and prepare them for training.', 'لنكمل السجلات ونجهّزها للتدريب.');
S('f3.win', 'So color alone is not always enough to identify a fruit?', 'إذن اللون وحده لا يكفي دائمًا للتعرف على الثمرة؟');
S('f3.win2', 'Right. Different fruits can share some features. Using several useful features and many examples helps the model learn better patterns.', 'صحيح. قد تتشارك ثمار مختلفة في بعض الـ Features. استخدام عدة Features مفيدة وأمثلة كثيرة يساعد النموذج على تعلّم أنماط أفضل.');
S('f3.t1', 'We have prepared the records, but how will the model use them? Will it simply read them?', 'جهزنا السجلات، لكن كيف سيستخدمها النموذج؟ هل سيقرؤها فقط؟');
S('f3.t2', 'We need to show it many examples so it can learn the relationship between the features and the fruit types.', 'نحتاج أن نريه أمثلة كثيرة ليتعلم العلاقة بين الـ Features وأنواع الفاكهة.');
S('f3.t3', 'When we train a model with examples that include both features and correct labels, we are using **Supervised Learning**.', 'عندما ندرّب نموذجًا بأمثلة تتضمن الـ Features والـ Labels الصحيحة، فإننا نستخدم Supervised Learning.');
S('f3.t4', 'The training center door is unlocked. Go and try it.', 'تم فتح باب مركز التدريب. اذهب وجرّبه.');
S('a3.t1', 'Task 1: Features or Label?', 'المهمة 1: Feature أم Label؟');
S('a3.q1', 'Sort each field. Which are Features that describe the fruit, and which is the Label the model should predict?', 'صنّف كل حقل. أيها Features تصف الثمرة، وأيها الـ Label الذي يجب أن يتنبأ به النموذج؟');
S('a3.f.color', 'Color', 'اللون');
S('a3.f.weight', 'Weight', 'الوزن');
S('a3.f.shape', 'Shape', 'الشكل');
S('a3.f.type', 'Fruit type', 'نوع الثمرة');
S('a3.feat', 'Feature', 'Feature');
S('a3.lab', 'Label', 'Label');
S('a3.h1', 'Ask: does this field describe the fruit, or is it the answer we want predicted?', 'اسأل: هل يصف هذا الحقل الثمرة، أم هو الإجابة التي نريد التنبؤ بها؟');
S('a3.h2', 'Color, weight and shape describe the fruit. Only one field is the answer.', 'اللون والوزن والشكل تصف الثمرة. حقل واحد فقط هو الإجابة.');
S('a3.ex', 'Features describe a sample (color, weight, shape). The Label is the target answer (the fruit type).', 'الـ Features تصف الـ Sample (اللون والوزن والشكل). أما الـ Label فهو الإجابة المستهدفة (نوع الثمرة).');
S('a3.t2', 'Task 2: Complete the missing Labels', 'المهمة 2: أكمل الـ Labels الناقصة');
S('a3.q2', 'These records have no Label. Use the Features to add the right fruit type to each one.', 'هذه السجلات بلا Label. استخدم الـ Features لإضافة نوع الثمرة الصحيح لكل سجل.');
S('a3.h3', 'Does the Label describe the fruit, or is it the answer the model should predict?', 'هل يصف الـ Label الثمرة، أم هو الإجابة التي يجب أن يتنبأ بها النموذج؟');
S('a3.h4', 'Compare each record with the examples you know: red and round, yellow and long, orange and round.', 'قارن كل سجل بالأمثلة التي تعرفها: أحمر ودائري، أصفر وطويل، برتقالي ودائري.');
S('a3.ex2', 'Red and round is an Apple, yellow and long is a Banana, orange and round is an Orange.', 'الأحمر الدائري تفاحة، والأصفر الطويل موز، والبرتقالي الدائري برتقال.');
S('a3.pick', 'Choose a label', 'اختر Label');

/* ---------- Scene 4: The First Learner ---------- */
S('f4.1', 'We have prepared everything, but the model still does not know any fruit types.', 'جهزنا كل شيء، لكن النموذج ما زال لا يعرف أي نوع من الفاكهة.');
S('f4.2', 'That is because it has not been trained yet.', 'لأنه لم يُدرَّب بعد.');
S('f4.3', 'Can we tell it that this is an apple, this is a banana, and this is an orange?', 'هل يمكننا أن نخبره أن هذه تفاحة وهذه موزة وهذه برتقالة؟');
S('f4.4', 'That is the foundation of **Supervised Learning**. We use examples with input features and correct answers so the model can learn the relationship between them.', 'هذا هو أساس Supervised Learning. نستخدم أمثلة تحتوي على Features مدخلة وإجابات صحيحة ليتعلم النموذج العلاقة بينها.');
S('f4.5', 'What happens during training?', 'ماذا يحدث أثناء التدريب؟');
S('f4.6', 'The model learns from the examples we provide. After training, we can use it to predict an answer for a new sample.', 'يتعلم النموذج من الأمثلة التي نقدمها. بعد التدريب، يمكننا استخدامه للتنبؤ بإجابة لـ Sample جديدة.');
S('f4.7', 'So **Training** is the learning stage, and **Prediction** is using what the model has learned?', 'إذن Training هو مرحلة التعلم، و Prediction هو استخدام ما تعلمه النموذج؟');
S('f4.8', 'Exactly.', 'بالضبط.');
S('f4.9', 'Can it recognize a fruit it has never seen before?', 'هل يستطيع التعرف على ثمرة لم يرها من قبل؟');
S('f4.10', 'That is what we are about to test.', 'هذا ما سنختبره الآن.');
S('a4.title', 'The First Learner', 'The First Learner');
S('a4.s1', 'Stage 1: Training', 'المرحلة 1: Training');
S('a4.s2', 'Stage 2: Prediction', 'المرحلة 2: Prediction');
S('a4.status0', 'Status: Not Trained', 'الحالة: Not Trained');
S('a4.status1', 'Status: Trained', 'الحالة: Trained');
S('a4.train', 'Train the model', 'درّب النموذج');
S('a4.predict', 'Predict', 'تنبّأ');
S('a4.new', 'A new fruit arrives:', 'وصلت ثمرة جديدة:');
S('a4.pickq', 'What do you predict this fruit is?', 'ماذا تتوقع أن تكون هذه الثمرة؟');
S('a4.notrained', 'The model has not learned anything yet. Train it first, then ask for a prediction.', 'لم يتعلم النموذج شيئًا بعد. درّبه أولًا ثم اطلب منه Prediction.');
S('a4.trainedMsg', 'Trained on {n} labeled examples. Now it can predict.', 'تم التدريب على {n} أمثلة معنونة. يمكنه الآن التنبؤ.');
S('a4.model', 'The model compared the new fruit with its examples and says: {x}', 'قارن النموذج الثمرة الجديدة بأمثلته ويقول: {x}');
S('a4.nearest', 'Closest example: {x}', 'أقرب مثال: {x}');
S('a4.h1', 'The model predicts the type of the new fruit. Look at its color, shape and weight.', 'يتنبأ النموذج بنوع الثمرة الجديدة. انظر إلى لونها وشكلها ووزنها.');
S('a4.h2', 'Which training example does this fruit look most like?', 'بأي مثال تدريبي تشبه هذه الثمرة أكثر؟');
S('a4.ex', 'The new fruit is red, round and 160 g, which is closest to the Apple examples.', 'الثمرة الجديدة حمراء ودائرية ووزنها 160 غ، وهي الأقرب إلى أمثلة التفاح.');
S('a4.note', 'This is a tiny teaching model. Real models learn from far more data.', 'هذا نموذج تعليمي صغير. النماذج الحقيقية تتعلم من بيانات أكثر بكثير.');
S('a4.win', 'The training center lights up. The gate glows, and the citizens line up to try the model.', 'يضيء مركز التدريب. تتوهج البوابة، ويصطف المواطنون لتجربة النموذج.');
S('tn.1', 'Wonderful! Here is a banana from the stall.', 'رائع! إليكم موزة من البسطة.');
S('tn.2', 'Prediction: Apple.', 'Prediction: Apple.');
S('tn.3', 'Wait. That is a banana. The training center also reads the village archive of old records, and the model learned from something wrong.', 'مهلًا. هذه موزة. يقرأ مركز التدريب أيضًا أرشيف القرية من السجلات القديمة، وقد تعلم النموذج من شيء خاطئ.');
S('tn.4', 'The old records are kept in the Harvest Archive. The stairs behind the machine lead down to it. Go and look.', 'السجلات القديمة محفوظة في Harvest Archive. الدرج خلف الآلة يؤدي إليها. اذهبا وانظرا.');
S('tn.show', 'The model says: Apple', 'يقول النموذج: Apple');

/* ---------- Boss ---------- */
S('b.1', 'Shelves and shelves of records. This is where the model read from.', 'رفوف كثيرة مليئة بالسجلات. من هنا قرأ النموذج.');
S('b.2', 'Welcome. These records were stamped years ago by Misprint. Nobody ever checked them.', 'مرحبًا. ختم Misprint هذه السجلات قبل سنوات. لم يراجعها أحد قط.');
S('b.3', 'The learner trusts every answer in the archive! I only stamp what I see.', 'المتعلّم يثق بكل إجابة في الأرشيف! أنا فقط أختم ما أراه.');
S('b.4', "Then let's look at what you stamped.", 'إذن لننظر إلى ما ختمته.');
S('b.win1', 'I was only copying. Nobody told me to check.', 'كنت أنسخ فقط. لم يطلب مني أحد أن أتحقق.');
S('b.win2', 'Then check as you stamp.', 'إذن تحقق وأنت تختم.');
S('b.win3', "Misprint's stamp pad dries out. The spirit becomes the archive's proofreader.", 'يجفّ حبر ختم Misprint. ويصبح الروح مدقّق الأرشيف.');
S('b.frag', 'Core Fragment 1 appears.', 'تظهر Core Fragment 1.');
S('b.milo', 'I used to... watch things. I think that is the first piece. Not a very useful piece, but it is mine.', 'كنت أراقب الأشياء... أظن أن هذه أول قطعة. ليست قطعة مفيدة جدًا، لكنها لي.');
S('b.br1', 'Now the model is right on the fruit we showed it. What about fruit it has never seen?', 'الآن أصبح النموذج صحيحًا على الفاكهة التي أريناه إياها. ماذا عن فاكهة لم يرها من قبل؟');
S('b.br2', 'How do we know it has truly learned, rather than just remembering?', 'كيف نعرف أنه تعلم فعلًا، وليس مجرد تذكّر؟');
S('b.br3', 'That is the next question. Far across the valley there is a workshop that hums. Somebody there tests things.', 'هذا هو السؤال التالي. بعيدًا عبر الوادي توجد ورشة تُصدر طنينًا. هناك من يختبر الأشياء.');
S('b.path', 'A path of lit stones opens toward the Model Workshop.', 'يُفتح طريق من أحجار مضيئة باتجاه Model Workshop.');
S('b.start', 'Fight: Misprint, the Mislabeler', 'المعركة: Misprint، مُسيء التسمية');
S('b.meter', "Misprint's confusion", 'ارتباك Misprint');
S('b.ph1', 'Phase 1: The Confusing Catalog', 'المرحلة 1: The Confusing Catalog');
S('b.ph2', 'Phase 2: False Answers', 'المرحلة 2: False Answers');
S('b.ph3', 'Phase 3: Archive Audit', 'المرحلة 3: Archive Audit');
S('b.ph4', 'Phase 4: Clean-Record Trial', 'المرحلة 4: Clean-Record Trial');
S('b.q', 'Question {n} of 10', 'السؤال {n} من 10');
S('b.card', 'Label: {x}', 'Label: {x}');

/* boss questions */
S('q1.p', 'Tap the record whose label does not match its features.', 'المس السجل الذي لا يتطابق الـ Label فيه مع الـ Features.');
S('q1.h1', 'Compare what the fruit looks like with the label written on its card.', 'قارن شكل الثمرة بالـ Label المكتوب على بطاقتها.');
S('q1.h2', 'Look for a card where the color and shape clearly point to a different fruit.', 'ابحث عن بطاقة يشير لونها وشكلها بوضوح إلى ثمرة مختلفة.');
S('q1.ex', 'The features point to one fruit and the label says another. That mismatch is a mislabeled record.', 'تشير الـ Features إلى ثمرة بينما يذكر الـ Label ثمرة أخرى. هذا التعارض يعني سجلًا مُسمّى خطأً.');
S('q2.p', 'Two cards have almost the same features, but one is labeled Apple and the other Orange. What does this tell the learner?', 'بطاقتان لهما الـ Features نفسها تقريبًا، لكن إحداهما Label تفاحة والأخرى Label برتقال. ماذا يخبر ذلك المتعلّم؟');
S('q2.a', 'It gets contradictory signals, which can confuse what it learns.', 'يتلقى إشارات متناقضة، وهذا قد يربك ما يتعلمه.');
S('q2.b', 'It learns that apples and oranges are the same fruit.', 'يتعلم أن التفاح والبرتقال ثمرة واحدة.');
S('q2.c', 'Nothing. Labels never matter for learning.', 'لا شيء. الـ Labels لا تهم أبدًا في التعلم.');
S('q2.h1', 'What would you learn if the same picture kept getting different answers?', 'ماذا ستتعلم لو حصلت الصورة نفسها على إجابات مختلفة باستمرار؟');
S('q2.h2', 'A learner uses labels as the correct answers. Do these answers agree?', 'يستخدم المتعلّم الـ Labels كإجابات صحيحة. هل تتفق هذه الإجابات؟');
S('q2.ex', 'When similar examples carry different labels, the learner receives contradictory signals and its predictions become unreliable.', 'عندما تحمل أمثلة متشابهة Labels مختلفة، يتلقى المتعلّم إشارات متناقضة وتصبح تنبؤاته غير موثوقة.');
S('q3.p', 'Tap ALL the records whose labels look wrong.', 'المس كل السجلات التي تبدو الـ Labels فيها خاطئة.');
S('q3.h1', 'More than one record is wrong. Check each card against its features.', 'أكثر من سجل خاطئ. تحقق من كل بطاقة مقابل الـ Features.');
S('q3.h2', 'Two cards are wrong. Look for fruits whose color and shape belong to another label.', 'بطاقتان خاطئتان. ابحث عن ثمار لونها وشكلها يناسبان Label آخر.');
S('q3.ex', 'Each wrong card describes a fruit whose color and shape point to a different label. Check every card against its features.', 'كل بطاقة خاطئة تصف ثمرة يشير لونها وشكلها إلى Label مختلف. تحقق من كل بطاقة مقابل الـ Features.');
S('q4.p', 'The learner trained on the archive sees this fruit: yellow, long, 126 g. It says: {x}. Why?', 'المتعلّم المدرَّب على الأرشيف يرى هذه الثمرة: صفراء، طويلة، 126 غ. يقول: {x}. لماذا؟');
S('q4.a', 'Its closest example was labeled Apple, even though that label is wrong.', 'كان أقرب مثال إليها يحمل Label تفاحة، رغم أن هذا الـ Label خاطئ.');
S('q4.b', 'Because yellow always means Apple.', 'لأن الأصفر يعني تفاحة دائمًا.');
S('q4.c', 'Because the model is too small to learn anything.', 'لأن النموذج أصغر من أن يتعلم أي شيء.');
S('q4.h1', 'Look at the closest examples the model found.', 'انظر إلى أقرب الأمثلة التي وجدها النموذج.');
S('q4.h2', 'The model copies the label of the example that looks most like the new fruit. Was that label right?', 'ينسخ النموذج الـ Label من المثال الأكثر شبهًا بالثمرة الجديدة. هل كان ذلك الـ Label صحيحًا؟');
S('q4.ex', 'The model copied the label of its nearest example. That example was mislabeled, so the model repeated the mistake.', 'نسخ النموذج الـ Label من أقرب مثال. كان ذلك المثال مُسمّى خطأً، فكرر النموذج الخطأ.');
S('q4.near', 'Closest examples', 'أقرب الأمثلة');
S('q5.p', 'Predict first: if the wrongly labeled card is removed and the model is trained again, what will it say for the same fruit?', 'توقّع أولًا: إذا أُزيلت البطاقة ذات الـ Label الخاطئ وأُعيد تدريب النموذج، ماذا سيقول للثمرة نفسها؟');
S('q5.h1', 'Without the wrong Apple label, which example is now closest?', 'بدون Label التفاحة الخاطئ، أي مثال أصبح الأقرب؟');
S('q5.h2', 'Yellow and long fruits in the archive are labeled Banana.', 'الثمار الصفراء الطويلة في الأرشيف عليها Label موز.');
S('q5.ex', 'With the wrong card gone, the nearest examples are yellow, long fruits labeled Banana.', 'بعد إزالة البطاقة الخاطئة، أقرب الأمثلة هي ثمار صفراء طويلة عليها Label موز.');
S('q5.res', 'After retraining without that card, the model says: {x}', 'بعد إعادة التدريب بدون تلك البطاقة، يقول النموذج: {x}');
S('q6.p', 'Supervised Learning treats labels as the correct answers. If a label is wrong, what can happen?', 'يتعامل Supervised Learning مع الـ Labels على أنها الإجابات الصحيحة. إذا كان Label خاطئًا، ماذا قد يحدث؟');
S('q6.a', 'The model may copy the wrong answer.', 'قد ينسخ النموذج الإجابة الخاطئة.');
S('q6.b', 'The model automatically notices and fixes it.', 'يلاحظه النموذج ويصححه تلقائيًا.');
S('q6.c', 'Only the weight column is affected.', 'يتأثر عمود الوزن فقط.');
S('q6.h1', 'What does the learner use as the target answer during training?', 'ما الذي يستخدمه المتعلّم كإجابة مستهدفة أثناء التدريب؟');
S('q6.h2', 'The learner has no other source of truth than the labels it is given.', 'ليس لدى المتعلّم مصدر آخر للحقيقة غير الـ Labels المعطاة له.');
S('q6.ex', 'The model learns from the labels it is given. It cannot know a label is wrong unless someone checks.', 'يتعلم النموذج من الـ Labels المعطاة له. ولا يستطيع معرفة أن Label خاطئ ما لم يتحقق أحد.');
S('q7.p', 'Audit these six records. For each card choose Keep, Fix (and pick the right label) or Flag if you cannot be sure.', 'دقّق في هذه السجلات الستة. لكل بطاقة اختر Keep أو Fix (واختر الـ Label الصحيح) أو Flag إذا لم تكن متأكدًا.');
S('q7.keep', 'Keep', 'Keep');
S('q7.fix', 'Fix', 'Fix');
S('q7.flag', 'Flag', 'Flag');
S('q7.h1', 'Keep cards that match. Fix cards where the evidence is clear. Flag cards where the evidence is not clear.', 'احتفظ بالبطاقات المتطابقة. أصلح البطاقات التي الدليل فيها واضح. علّم البطاقات التي الدليل فيها غير واضح.');
S('q7.h2', 'A yellow round fruit labeled Banana could be several things. Do not guess: flag it.', 'ثمرة صفراء دائرية عليها Label موز قد تكون أشياء كثيرة. لا تخمّن: علّمها.');
S('q7.ex', 'Matching cards stay. Clearly wrong cards get fixed using their features. The uncertain card is flagged for review, not guessed.', 'تبقى البطاقات المتطابقة. تُصلح البطاقات الخاطئة بوضوح بالاعتماد على Features. أما البطاقة غير المؤكدة فتُعلَّم للمراجعة ولا تُخمَّن.');
S('q8.p', 'A label looks odd, but you are not sure it is wrong. What is the best action?', 'يبدو أحد الـ Labels غريبًا، لكنك لست متأكدًا أنه خاطئ. ما أفضل إجراء؟');
S('q8.a', 'Flag it for review and look for more evidence.', 'نعلّمه للمراجعة ونبحث عن أدلة أكثر.');
S('q8.b', 'Change it to your best guess.', 'نغيّره إلى أفضل تخمين.');
S('q8.c', 'Delete the whole archive.', 'نحذف الأرشيف كله.');
S('q8.h1', 'Is it wise to change a label when you are unsure?', 'هل من الحكمة تغيير Label وأنت غير متأكد؟');
S('q8.h2', 'You want to improve the data without adding new mistakes.', 'تريد تحسين البيانات دون إضافة أخطاء جديدة.');
S('q8.ex', 'When you are unsure, flag the record and gather more evidence. A wrong fix adds a new mistake.', 'عندما تكون غير متأكد، علّم السجل واجمع المزيد من الأدلة. الإصلاح الخاطئ يضيف خطأً جديدًا.');
S('q9.p', 'We tested the learner on 6 new fruits. Before cleaning it got {a} of 6 right. After fixing the labels it got {b} of 6. What does this show?', 'اختبرنا المتعلّم على 6 ثمار جديدة. قبل التنظيف أصاب {a} من 6. وبعد إصلاح الـ Labels أصاب {b} من 6. ماذا يوضح ذلك؟');
S('q9.a', 'Fixing wrong labels helped, and flagged records still need review.', 'إصلاح الـ Labels الخاطئة ساعد، وما زالت السجلات المعلَّمة تحتاج إلى مراجعة.');
S('q9.b', 'Labels have no effect on accuracy.', 'ليس للـ Labels أي تأثير على الدقة.');
S('q9.c', 'Cleaning always gives a perfect model.', 'التنظيف يعطي نموذجًا مثاليًا دائمًا.');
S('q9.h1', 'Compare the two scores. Which one used the better labels?', 'قارن بين النتيجتين. أيهما استخدمت Labels أفضل؟');
S('q9.h2', 'Six fruits is a small test. Can one small test prove a model is perfect?', 'ست ثمار اختبار صغير. هل يمكن لاختبار صغير أن يثبت أن النموذج مثالي؟');
S('q9.ex', 'Better labels gave better predictions, but a small test and unresolved flagged records mean we should keep checking.', 'أعطت الـ Labels الأفضل تنبؤات أفضل، لكن الاختبار الصغير والسجلات المعلَّمة غير المحسومة تعني أن علينا مواصلة التحقق.');
S('q9.before', 'Before cleaning', 'قبل التنظيف');
S('q9.after', 'After cleaning', 'بعد التنظيف');
S('q10.p', 'Put the steps for fixing a noisy dataset in order. Tap them from first to last.', 'رتّب خطوات إصلاح Dataset تحتوي على ضوضاء. المسها من الأولى إلى الأخيرة.');
S('q10.s1', 'Audit the records', 'دقّق في السجلات');
S('q10.s2', 'Fix or flag the wrong labels', 'أصلح أو علّم الـ Labels الخاطئة');
S('q10.s3', 'Train the model again', 'درّب النموذج مجددًا');
S('q10.s4', 'Check it on new fruit', 'اختبره على ثمار جديدة');
S('q10.h1', 'You cannot fix what you have not found yet.', 'لا يمكنك إصلاح ما لم تجده بعد.');
S('q10.h2', 'Training comes after the data is cleaned, and checking comes after training.', 'يأتي التدريب بعد تنظيف البيانات، ويأتي الاختبار بعد التدريب.');
S('q10.ex', 'Audit, fix or flag, retrain, then check on new fruit.', 'دقّق، ثم أصلح أو علّم، ثم أعد التدريب، ثم اختبر على ثمار جديدة.');
S('q10.order', 'Your order: {x}', 'ترتيبك: {x}');
S('fb.ok', 'Correct!', 'صحيح!');
S('fb.no', 'Not quite. Try again.', 'ليس تمامًا. حاول مرة أخرى.');
S('fb.keep', 'Good work. Keep going.', 'عمل جيد. واصل.');
S('fb.pickfirst', 'Choose an answer first.', 'اختر إجابة أولًا.');
S('fb.complete', 'Please decide for every card.', 'يرجى اتخاذ قرار لكل بطاقة.');

/* ---------- Side quests ---------- */
S('sq1.p', "Pip's rulebook says: red means Apple, yellow means Banana, round means Orange. Tap every fruit that the rulebook gets wrong.", 'يقول كتاب قواعد Pip: الأحمر يعني تفاحة، والأصفر يعني موز، والدائري يعني برتقال. المس كل ثمرة يخطئ فيها الكتاب.');
S('sq1.says', 'Rulebook says: {x}', 'يقول الكتاب: {x}');
S('sq1.is', 'It really is: {x}', 'هي في الحقيقة: {x}');
S('sq1.h1', 'Compare what the rulebook says with what the fruit really is.', 'قارن بين ما يقوله الكتاب وما هي الثمرة في الحقيقة.');
S('sq1.h2', 'Three fruits are wrong. Rules that only look at one thing break easily.', 'ثلاث ثمار خاطئة. القواعد التي تنظر إلى شيء واحد فقط تنكسر بسهولة.');
S('sq1.ex', 'The green apple, the golden apple and the cherry all break the rules. Every new exception needs a new rule, which is why learning from examples helps.', 'التفاحة الخضراء والتفاحة الذهبية والكرز تكسر القواعد. كل استثناء جديد يحتاج إلى قاعدة جديدة، ولهذا يفيد التعلم من الأمثلة.');
S('sq1.done', 'Pip crosses out half the rulebook and starts collecting examples instead.', 'يشطب Pip نصف كتاب القواعد ويبدأ بجمع الأمثلة بدلًا منه.');
S('fr.Green apple', 'Green apple', 'تفاحة خضراء');
S('fr.Golden apple', 'Golden apple', 'تفاحة ذهبية');
S('fr.Cherry', 'Cherry', 'كرز');
S('fr.Red apple', 'Red apple', 'تفاحة حمراء');
S('fr.Banana', 'Banana', 'موز');
S('sq2.intro', 'Luma has three baskets of records. Which basket would teach a model the best?', 'لدى Luma ثلاث سلال من السجلات. أي سلة ستعلّم النموذج بشكل أفضل؟');
S('sq2.A', 'Basket A: 6 red apples', 'السلة A: 6 تفاحات حمراء');
S('sq2.B', 'Basket B: 2 apples, 2 bananas, 2 oranges', 'السلة B: تفاحتان وموزتان وبرتقالتان');
S('sq2.C', 'Basket C: 3 bananas', 'السلة C: 3 موزات');
S('sq2.h1', 'A dataset should look like the kinds of fruit the model will meet.', 'يجب أن تشبه الـ Dataset أنواع الفاكهة التي سيقابلها النموذج.');
S('sq2.h2', 'Which basket has the most variety?', 'أي سلة فيها أكبر تنوع؟');
S('sq2.ex', 'Basket B has every fruit type. A dataset of only one kind cannot teach a model to tell fruits apart. This is called representative data.', 'السلة B فيها كل أنواع الفاكهة. الـ Dataset التي تحتوي نوعًا واحدًا لا تستطيع تعليم النموذج التمييز بين الثمار. هذا يسمى بيانات ممثِّلة (Representative data).');
S('sq2.done', 'Luma fills the baskets with a mix of fruit.', 'تملأ Luma السلال بمزيج من الفاكهة.');
S('sq3.intro', 'Luma wrote four columns on every record. Which column does NOT describe the fruit itself?', 'كتبت Luma أربعة أعمدة في كل سجل. أي عمود لا يصف الثمرة نفسها؟');
S('sq3.col1', 'Color', 'اللون');
S('sq3.col2', 'Shape', 'الشكل');
S('sq3.col3', 'Weight', 'الوزن');
S('sq3.col4', 'Cart number', 'رقم العربة');
S('sq3.h1', 'Which column would be the same for a banana and an apple on the same cart?', 'أي عمود سيكون هو نفسه لموزة وتفاحة على العربة نفسها؟');
S('sq3.h2', 'A useful Feature tells you something about the fruit itself.', 'الـ Feature المفيدة تخبرك بشيء عن الثمرة نفسها.');
S('sq3.ex', 'The cart number says where the fruit traveled, not what it is. It is not a useful Feature for telling fruit types apart.', 'رقم العربة يخبرنا أين سافرت الثمرة، لا ما هي. ليس Feature مفيدة للتمييز بين أنواع الفاكهة.');
S('sq3.done', 'Luma crosses out the cart number column.', 'تشطب Luma عمود رقم العربة.');
S('sq.ask1', 'Luma: "Want to help with a basket problem?"', 'Luma: «هل تريد المساعدة في مشكلة السلال؟»');
S('sq2.opt', 'Side quest: The Sparse Basket', 'مهمة جانبية: The Sparse Basket');
S('sq3.opt', 'Side quest: The Cart Number', 'مهمة جانبية: The Cart Number');
S('sq2.name', 'The Sparse Basket', 'The Sparse Basket');
S('sq3.name', 'The Cart Number', 'The Cart Number');
S('luma.main2', 'Continue: the empty harvest', 'متابعة: الحصاد الفارغ');
S('luma.main3', 'Continue: the records', 'متابعة: السجلات');
S('luma.idle', 'The records look so tidy now. Thank you both!', 'تبدو السجلات مرتبة جدًا الآن. شكرًا لكما!');
S('luma.cancel', 'Not now', 'ليس الآن');
S('lumaSQ2.in', 'My basket holds only red apples. Does that look right to you?', 'سلتي لا تحتوي إلا تفاحًا أحمر. هل يبدو هذا صحيحًا لك؟');
S('lumaSQ3.in', 'I wrote a cart number on every record. Is it useful?', 'كتبت رقم العربة على كل سجل. هل هو مفيد؟');

/* ---------- Rehearsal ---------- */
S('r.title', 'Practice round: five quick tasks', 'جولة تدريب: خمس مهام سريعة');
S('r.1', 'A dataset contains records for five fruits. What represents one sample?', 'تحتوي Dataset على سجلات لخمس ثمار. ما الذي يمثل Sample واحدة؟');
S('r.1a', 'The entire group of five records.', 'مجموعة السجلات الخمسة كاملة.');
S('r.1b', 'One record describing a single fruit.', 'سجل واحد يصف ثمرة واحدة.');
S('r.1c', 'The name of the column containing weight.', 'اسم العمود الذي يحتوي على الوزن.');
S('r.2', "If the model should predict a fruit's type, which field is the Label?", 'إذا كان على النموذج التنبؤ بنوع الثمرة، فأي حقل هو الـ Label؟');
S('r.2a', 'Fruit color', 'لون الثمرة');
S('r.2b', 'Fruit weight', 'وزن الثمرة');
S('r.2c', 'Fruit type', 'نوع الثمرة');
S('r.3', 'We have examples that contain features and correct answers. Which learning type uses them?', 'لدينا أمثلة تحتوي على Features وإجابات صحيحة. أي نوع من التعلم يستخدمها؟');
S('r.3a', 'Supervised Learning', 'Supervised Learning');
S('r.3b', 'Unsupervised Learning', 'Unsupervised Learning');
S('r.3c', 'A method that cannot use examples', 'طريقة لا تستطيع استخدام الأمثلة');
S('r.4', 'Which order is correct?', 'أي ترتيب صحيح؟');
S('r.4a', 'Train with labeled examples, then predict for a new sample', 'ندرّب بأمثلة معنونة (Labeled)، ثم نتنبأ لـ Sample جديدة');
S('r.4b', 'Predict first, then train', 'نتنبأ أولًا، ثم ندرّب');
S('r.4c', 'Predict without ever training', 'نتنبأ دون تدريب إطلاقًا');
S('r.5', 'A model predicts the type of a new fruit correctly once. Does that mean it is excellent?', 'تنبأ النموذج بنوع ثمرة جديدة بشكل صحيح مرة واحدة. هل يعني ذلك أنه ممتاز؟');
S('r.5a', 'Yes, because the prediction was correct.', 'نعم، لأن التنبؤ كان صحيحًا.');
S('r.5b', 'No. We need to test it on more examples.', 'لا. نحتاج إلى اختباره على أمثلة أكثر.');
S('r.5c', 'Yes, as long as it was trained on the dataset.', 'نعم، ما دام قد تدرّب على الـ Dataset.');
S('r.h', 'Think about what each word means. Look back at the Codex if you need to.', 'فكّر في معنى كل كلمة. ارجع إلى Codex إن احتجت.');
S('r.h2', 'Take your time. Which choice fits the idea from the lesson?', 'خذ وقتك. أي خيار يناسب الفكرة من الدرس؟');
S('r.ex1', 'A sample is one individual record.', 'الـ Sample سجل فردي واحد.');
S('r.ex2', 'The Label is the target value the model should predict.', 'الـ Label هو القيمة المستهدفة التي يجب أن يتنبأ بها النموذج.');
S('r.ex3', 'Supervised Learning uses examples with known labels.', 'يستخدم Supervised Learning أمثلة ذات Labels معروفة.');
S('r.ex4', 'Training comes first, then prediction.', 'يأتي Training أولًا ثم Prediction.');
S('r.ex5', 'One result is not enough to judge a model. The next city teaches how to test it.', 'نتيجة واحدة لا تكفي للحكم على نموذج. المدينة التالية تعلّمنا كيف نختبره.');
S('r.done', 'Practice complete. Well done!', 'اكتمل التدريب. أحسنت!');

/* ---------- Journal ---------- */
S('jr.main', 'Main story', 'القصة الرئيسية');
S('jr.side', 'Side quests', 'المهام الجانبية');
S('jr.todo', 'Not started', 'لم تبدأ');
S('jr.avail', 'Available', 'متاحة');
S('jr.done', 'Done', 'مكتملة');
S('jr.locked', 'Locked', 'مقفلة');
S('jr.reh', 'Practice round', 'جولة تدريب');

/* ---------- End screen ---------- */
S('end.title', 'Chapter 1 complete', 'اكتمل الفصل الأول');
S('end.body', 'You trained a model, found the bad labels, and helped repair Learning Meadows.', 'درّبت نموذجًا، ووجدت الـ Labels الخاطئة، وساعدت في إصلاح Learning Meadows.');
S('end.score', 'Boss questions answered without the worked example: {n} of 10', 'أسئلة الزعيم التي أجبت عنها دون المثال المحلول: {n} من 10');
S('end.concept', 'Label quality', 'Label quality');
S('end.frag', 'Core Fragment 1 of 6', 'Core Fragment 1 من 6');
S('end.next', 'Next: Model Workshop (coming soon)', 'التالي: Model Workshop (قريبًا)');
S('end.explore', 'Keep exploring', 'واصل الاستكشاف');
S('m.not', 'Not Yet', 'Not Yet');
S('m.prac', 'Practicing', 'Practicing');
S('m.demo', 'Demonstrated', 'Demonstrated');

/* ---------- Codex ---------- */
const CODEX = ['ml', 'rules', 'sample', 'dataset', 'rep', 'feature', 'label', 'usefeat', 'supervised', 'training', 'prediction', 'noise', 'audit'];
S('cx.ml.term', 'Machine Learning', 'Machine Learning');
S('cx.ml.body', 'Instead of writing a rule for every case, a computer learns patterns from examples and uses them to make predictions.', 'بدلًا من كتابة قاعدة لكل حالة، يتعلم الحاسوب أنماطًا من الأمثلة ويستخدمها للتنبؤ.');
S('cx.rules.term', 'Rules versus examples', 'Rules versus examples');
S('cx.rules.body', 'Rules only cover the cases we imagined. Examples let a model learn patterns that can fit new cases too.', 'القواعد تغطي فقط الحالات التي تخيلناها. الأمثلة تتيح للنموذج تعلّم أنماط تناسب الحالات الجديدة أيضًا.');
S('cx.sample.term', 'Sample', 'Sample');
S('cx.sample.body', 'One record that describes one example, such as one fruit.', 'سجل واحد يصف مثالًا واحدًا، مثل ثمرة واحدة.');
S('cx.dataset.term', 'Dataset', 'Dataset');
S('cx.dataset.body', 'An organized collection of many samples.', 'مجموعة منظمة من عينات (Samples) كثيرة.');
S('cx.rep.term', 'Representative data', 'Representative data');
S('cx.rep.body', 'Data that looks like the cases the model will meet later. Having many records is not enough if they are all the same kind.', 'بيانات تشبه الحالات التي سيقابلها النموذج لاحقًا. لا يكفي وجود سجلات كثيرة إذا كانت كلها من النوع نفسه.');
S('cx.feature.term', 'Feature', 'Feature');
S('cx.feature.body', 'A detail that describes a sample, such as color, weight or shape.', 'تفصيل يصف الـ Sample، مثل اللون أو الوزن أو الشكل.');
S('cx.label.term', 'Label', 'Label');
S('cx.label.body', 'The correct answer the model should learn to predict, such as the fruit type.', 'الإجابة الصحيحة التي يجب أن يتعلم النموذج التنبؤ بها، مثل نوع الثمرة.');
S('cx.usefeat.term', 'Useful Features', 'Useful Features');
S('cx.usefeat.body', 'Not every detail helps. A useful Feature tells you something about the sample itself, like color. A cart number does not.', 'ليست كل التفاصيل مفيدة. الـ Feature المفيدة تخبرك بشيء عن الـ Sample نفسها، مثل اللون. أما رقم العربة فلا.');
S('cx.supervised.term', 'Supervised Learning', 'Supervised Learning');
S('cx.supervised.body', 'Learning from examples that come with the correct answers (labels).', 'التعلم من أمثلة تأتي مع الإجابات الصحيحة (Labels).');
S('cx.training.term', 'Training', 'Training');
S('cx.training.body', 'The stage where the model learns from labeled examples.', 'المرحلة التي يتعلم فيها النموذج من الأمثلة المعنونة.');
S('cx.prediction.term', 'Prediction', 'Prediction');
S('cx.prediction.body', 'The answer a trained model gives for a new sample. It is an output, not a guarantee of truth.', 'الإجابة التي يعطيها نموذج مدرَّب لـ Sample جديدة. هي مخرَج وليست ضمانًا للحقيقة.');
S('cx.noise.term', 'Label noise', 'Label noise');
S('cx.noise.body', 'Wrong labels in the training data. The model copies the mistakes it is taught.', 'Labels خاطئة في بيانات التدريب. ينسخ النموذج الأخطاء التي يتعلمها.');
S('cx.audit.term', 'Data audit', 'Data audit');
S('cx.audit.body', 'Checking records against evidence. Fix clear mistakes, and flag unclear ones instead of guessing.', 'فحص السجلات مقابل الأدلة. أصلح الأخطاء الواضحة، وعلّم غير الواضحة بدل تخمينها.');

/* ---------- Teaching data ---------- */
const COLORS = {
  Red: { hue: 0, css: '#d9342b' }, Orange: { hue: 30, css: '#f28a1c' }, Yellow: { hue: 55, css: '#f2d02a' },
  Green: { hue: 110, css: '#5cb85c' }, Purple: { hue: 280, css: '#8e44ad' }, Lilac: { hue: 300, css: '#b48ad6' },
};
S('col.Red', 'Red', 'أحمر'); S('col.Orange', 'Orange', 'برتقالي'); S('col.Yellow', 'Yellow', 'أصفر');
S('col.Green', 'Green', 'أخضر'); S('col.Purple', 'Purple', 'بنفسجي'); S('col.Lilac', 'Lilac', 'ليلكي');
S('shp.Round', 'Round', 'دائري'); S('shp.Long', 'Long', 'طويل');
S('lbl.Apple', 'Apple', 'تفاحة'); S('lbl.Banana', 'Banana', 'موز'); S('lbl.Orange', 'Orange', 'برتقال'); S('lbl.Plum', 'Plum', 'برقوق');
S('lbl.Unknown', 'Unknown', 'غير معروف');
S('unit.g', 'g', 'غ');
const LABELS = ['Apple', 'Banana', 'Orange'];

const TRAIN6 = [
  { c: 'Red', s: 'Round', w: 150, l: 'Apple' }, { c: 'Yellow', s: 'Long', w: 120, l: 'Banana' },
  { c: 'Orange', s: 'Round', w: 180, l: 'Orange' }, { c: 'Red', s: 'Round', w: 170, l: 'Apple' },
  { c: 'Yellow', s: 'Long', w: 140, l: 'Banana' }, { c: 'Green', s: 'Round', w: 155, l: 'Apple' },
];
const PLUMS = [
  { c: 'Purple', s: 'Round', w: 70, l: 'Plum' }, { c: 'Purple', s: 'Round', w: 80, l: 'Plum' }, { c: 'Purple', s: 'Round', w: 90, l: 'Plum' },
];
const FRUIT_A = { c: 'Purple', s: 'Round', w: 85 };
const FRUIT_B = { c: 'Lilac', s: 'Round', w: 75 };
const NEW_FRUIT = { c: 'Red', s: 'Round', w: 160 };
const BANANA_TEST = { c: 'Yellow', s: 'Long', w: 125 };
/* the archive: id, label shown on the card, true label ('?' = cannot tell) */
const ARCH = [
  { id: 1, c: 'Red', s: 'Round', w: 148, l: 'Apple', t: 'Apple' },
  { id: 2, c: 'Red', s: 'Round', w: 165, l: 'Apple', t: 'Apple' },
  { id: 3, c: 'Yellow', s: 'Long', w: 118, l: 'Banana', t: 'Banana' },
  { id: 4, c: 'Yellow', s: 'Long', w: 135, l: 'Banana', t: 'Banana' },
  { id: 5, c: 'Orange', s: 'Round', w: 178, l: 'Orange', t: 'Orange' },
  { id: 6, c: 'Orange', s: 'Round', w: 190, l: 'Orange', t: 'Orange' },
  { id: 7, c: 'Green', s: 'Round', w: 152, l: 'Apple', t: 'Apple' },
  { id: 8, c: 'Yellow', s: 'Long', w: 125, l: 'Apple', t: 'Banana' },
  { id: 9, c: 'Orange', s: 'Round', w: 172, l: 'Banana', t: 'Orange' },
  { id: 10, c: 'Red', s: 'Round', w: 158, l: 'Apple', t: 'Apple' },
  { id: 11, c: 'Yellow', s: 'Long', w: 142, l: 'Banana', t: 'Banana' },
  { id: 12, c: 'Red', s: 'Round', w: 140, l: 'Orange', t: 'Apple' },
  { id: 13, c: 'Orange', s: 'Round', w: 183, l: 'Orange', t: 'Orange' },
  { id: 14, c: 'Green', s: 'Round', w: 160, l: 'Apple', t: 'Apple' },
  { id: 15, c: 'Yellow', s: 'Long', w: 122, l: 'Banana', t: 'Banana' },
  { id: 16, c: 'Yellow', s: 'Round', w: 135, l: 'Banana', t: '?' },
];
const CHECK6 = [
  { c: 'Yellow', s: 'Long', w: 126, t: 'Banana' }, { c: 'Orange', s: 'Round', w: 173, t: 'Orange' },
  { c: 'Red', s: 'Round', w: 141, t: 'Apple' }, { c: 'Red', s: 'Round', w: 160, t: 'Apple' },
  { c: 'Yellow', s: 'Long', w: 130, t: 'Banana' }, { c: 'Orange', s: 'Round', w: 185, t: 'Orange' },
];
const Q1_VARIANTS = [{ ids: [1, 3, 5, 8, 7], bad: 8 }, { ids: [2, 4, 6, 9, 10], bad: 9 }];
const Q3_VARIANTS = [{ ids: [2, 4, 6, 7, 9, 12, 13, 11], bad: [9, 12] }, { ids: [1, 4, 6, 7, 8, 12, 13, 14], bad: [8, 12] }];
const Q7_CARDS = [
  { id: 2, want: 'keep' }, { id: 4, want: 'keep' }, { id: 6, want: 'keep' },
  { id: 9, want: 'fix', to: 'Orange' }, { id: 12, want: 'fix', to: 'Apple' }, { id: 16, want: 'flag' },
];

/* ---------- Tiny learner: nearest example (1-NN) ---------- */
function vec(f) { return [COLORS[f.c].hue / 360, f.s === 'Long' ? 1 : 0, (f.w - 100) / 100]; }
function dist(a, b) { return Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) * (v - b[i]), 0)); }
function Learner(train) {
  const ex = train.map((r) => ({ r: r, v: vec(r) }));
  return {
    n: ex.length,
    predict(f) {
      const v = vec(f);
      const nb = ex.map((e) => ({ r: e.r, d: dist(v, e.v) })).sort((a, b) => a.d - b.d);
      return { label: nb[0].r.l, neighbors: nb.slice(0, 3) };
    },
  };
}
function accuracy(learner, tests) { return tests.filter((f) => learner.predict(f).label === f.t).length; }
function cleanedArchive() {
  return ARCH.filter((r) => r.id !== 16).map((r) => ({ c: r.c, s: r.s, w: r.w, l: r.t === '?' ? r.l : r.t }));
}
function archiveAsIs(withoutId) { return ARCH.filter((r) => r.id !== withoutId); }

