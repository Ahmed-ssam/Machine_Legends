'use strict';
/* ===== text6.js: city 4 (Valley of Neighbors) strings, EN / AR ===== */

S('room.valley', `Valley of Neighbors: Village`, `Valley of Neighbors: Village`);
S('room.scalehouse', `Valley of Neighbors: Scale House`, `Valley of Neighbors: Scale House`);
S('room.council4', `Valley of Neighbors: Neighbor Stones`, `Valley of Neighbors: Neighbor Stones`);
S('room.greatscale', `Valley of Neighbors: The Great Scale`, `Valley of Neighbors: The Great Scale`);
S('spk.nara', `Nara`, `Nara`); S('spk.tarn', `Tarn`, `Tarn`); S('spk.sera', `Sera`, `Sera`); S('spk.rowan', `Elder Rowan`, `Elder Rowan`); S('spk.tumble', `Tumble`, `Tumble`); S('spk.bulk', `Bulk`, `Bulk`);

S('obj4.travel', `Walk through the open Bird Gate, or open the map (M).`, `اعبر Bird Gate المفتوحة، أو افتح الخريطة (M).`);
S('obj4.nara', `Speak with Nara, the Village Keeper, near the village entrance.`, `تحدّث مع Nara حارسة القرية قرب مدخل القرية.`);
S('obj4.tarn', `Find Tarn at the Measuring Grounds, in the north of the village.`, `ابحث عن Tarn في Measuring Grounds شمال القرية.`);
S('obj4.sera', `Enter the Scale House at the top right and speak with Sera.`, `ادخل Scale House في أعلى اليمين وتحدّث مع Sera.`);
S('obj4.council', `Take the path south to the Neighbor Stones.`, `اتبع الطريق جنوبًا إلى Neighbor Stones.`);
S('obj4.rowan', `Speak with Elder Rowan among the stones.`, `تحدّث مع Elder Rowan بين الحجارة.`);
S('obj4.scale', `Follow the rumbling to the Great Scale, at the east edge of the village.`, `اتبع صوت الارتجاج إلى Great Scale عند الحافة الشرقية للقرية.`);
S('obj4.boss', `Face Bulk at the Great Scale.`, `واجه Bulk عند Great Scale.`);
S('obj4.path', `Take the road east, out of the valley.`, `اتبع الطريق شرقًا للخروج من الوادي.`);
S('lock.scale4', `The Scale House is closed. Tarn wants to teach you about distance first.`, `Scale House مغلقة. يريد Tarn أن يعلّمك عن المسافة أولًا.`);
S('lock.council4', `The Neighbor Stones are still asleep. Finish at the Scale House first.`, `Neighbor Stones ما زالت نائمة. أنهِ مهمتك في Scale House أولًا.`);
S('lock.scale4b', `A stone barrier blocks the east road. Pass Elder Rowan's trial first.`, `حاجز حجري يسدّ الطريق الشرقي. اجتز اختبار Elder Rowan أولًا.`);
S('lock.path4', `The road is still blocked by the Great Scale.`, `الطريق ما زال مسدودًا بسبب Great Scale.`);
S('tile.marker4', `A stone marker. One side reads "5 meters", the other "5000 grams". Same number sense? Not at all.`, `علامة حجرية. على جانب مكتوب "5 meters" وعلى الآخر "5000 grams". هل الأرقام متشابهة في الحجم؟ أبدًا.`);
S('tile.grounds', `A grid of stone tiles. Every creature stands on the spot that matches its features.`, `شبكة من البلاطات الحجرية. يقف كل مخلوق على المكان الذي يطابق Features الخاصة به.`);
S('tile.bscale', `A brass scale. One pan holds a pebble, the other holds a feather. It reads in grams.`, `ميزان نحاسي. في كفة حصاة وفي الأخرى ريشة. يقيس بالـ grams.`);
S('end3.cliff', `The path leads down into the Valley of Neighbors.`, `يقود الطريق إلى أسفل نحو Valley of Neighbors.`);
S('c3.br.1', `I know this place. This was the Model Engineering Center. We built things here. Then... we stopped looking at what we had built.`, `أعرف هذا المكان. كان هذا Model Engineering Center. كنا نبني أشياء هنا. ثم... توقفنا عن النظر إلى ما بنيناه.`);
S('c3.br.2', `What do we do when the answer depends on who is close by?`, `ماذا نفعل حين تعتمد الإجابة على من هو قريب؟`);
S('c3.br.3', `Then we ask the neighbors. Beyond the trees there is a valley that knows how to measure closeness.`, `إذن نسأل الجيران. خلف الأشجار يوجد وادٍ يعرف كيف يقيس القرب.`);

/* ---------- speaker idles ---------- */
S('c4.a1', `A quiet valley, stone paths... and markers everywhere. They show numbers I do not understand.`, `وادٍ هادئ، ودروب حجرية... وعلامات في كل مكان. تُظهر أرقامًا لا أفهمها.`);
S('c4.a2', `Welcome, travelers. In this valley we do not guess. We measure.`, `أهلًا بكما أيها المسافران. في هذا الوادي لا نخمّن. نحن نقيس.`);
S('c4.nara.idle', `Neighbors help each other. That is how our valley works.`, `الجيران يساعد بعضهم بعضًا. هكذا يعمل وادينا.`);
S('c4.nara.win', `The Great Scale reads fairly now. The whole valley thanks you.`, `Great Scale تقرأ بإنصاف الآن. الوادي كله يشكركما.`);
S('c4.tarn.wait', `Nara wants to greet you first. She is near the village entrance.`, `تريد Nara أن ترحّب بكما أولًا. هي قرب مدخل القرية.`);
S('c4.tarn.idle', `Distance is just a number that says how far apart two things are.`, `المسافة مجرد رقم يقول كم يبعد شيئان عن بعضهما.`);
S('c4.sera.wait', `Tarn is waiting to show you the Measuring Grounds. Find him first.`, `ينتظر Tarn ليريكما Measuring Grounds. ابحثا عنه أولًا.`);
S('c4.sera.idle', `The Neighbor Stones are south of the village. Elder Rowan is waiting.`, `Neighbor Stones جنوب القرية. Elder Rowan في الانتظار.`);
S('c4.rowan.wait', `Sera has something to show you first. Visit the Scale House.`, `لدى Sera ما تريد أن تريكما إياه أولًا. زورا Scale House.`);
S('c4.rowan.idle', `The stones are at peace. Come back for the trial whenever you wish.`, `الحجارة في سلام. عودا للاختبار متى شئتما.`);
S('c4.tumble.idle', `Gems by the gram, ribbons by the meter! Everything measured, nothing confused. Mostly.`, `جواهر بالـ gram، وشرائط بالـ meter! كل شيء مقيس ولا شيء مختلط. تقريبًا.`);

/* ---------- scene 1: Village of Similarities ---------- */
S('c4.s1.1', `Our creatures arrive and nobody knows their names. But we notice who looks like whom.`, `تصل مخلوقاتنا ولا أحد يعرف أسماءها. لكننا نلاحظ من يشبه من.`);
S('c4.s1.2', `So how do you decide what a new creature is?`, `إذن كيف تقرران ما هو المخلوق الجديد؟`);
S('c4.s1.3', `We ask: which known creature is it most similar to?`, `نسأل: أي مخلوق معروف هو الأكثر شبهًا به؟`);
S('c4.s1.4', `That is an idea machines use too! Similar examples often belong to the same class.`, `هذه فكرة تستخدمها الآلات أيضًا! الأمثلة المتشابهة كثيرًا ما تنتمي إلى الـ Class نفسه.`);
S('c4.s1.5', `Show me. Three newcomers have arrived today.`, `أرياني. وصل ثلاثة وافدين جدد اليوم.`);
S('c4.s1.win', `Similar features, similar class. You have the instinct of a true neighbor!`, `Features متشابهة، وClass متشابه. لديكما حدس جار حقيقي!`);
S('c4.s1.win2', `But "similar" depends on which features we look at.`, `لكن "متشابه" يعتمد على أي Features ننظر إليها.`);
S('c4.s1.win3', `That is the idea behind the **nearest neighbor** method: compare a new example with known ones.`, `هذه فكرة طريقة الـ **Nearest Neighbor**: قارن مثالًا جديدًا بأمثلة معروفة.`);
S('c4.s1.t1', `To compare fairly, we need numbers. Tarn at the Measuring Grounds, north of here, measures closeness.`, `لنقارن بإنصاف نحتاج إلى أرقام. Tarn في Measuring Grounds شمال هنا يقيس القرب.`);
S('c4.t1.title', `Who looks alike?`, `من يشبه من؟`);
S('c4.t11.p', `Cloudlet is small, has wings and has feathers. Which known creature is it most similar to?`, `Cloudlet صغير وله أجنحة وله ريش. أي مخلوق معروف هو الأكثر شبهًا به؟`);
S('c4.t11.a', `Skyfin (wings, feathers)`, `Skyfin (أجنحة، ريش)`); S('c4.t11.b', `Ripple (fins, water)`, `Ripple (زعانف، ماء)`); S('c4.t11.c', `Emberfox (fur, four legs)`, `Emberfox (فرو، أربع أرجل)`);
S('c4.t11.h1', `Compare the features, one by one.`, `قارن الـ Features واحدة واحدة.`); S('c4.t11.h2', `Which known creature also has wings and feathers?`, `أي مخلوق معروف له أجنحة وريش أيضًا؟`); S('c4.t11.ex', `Skyfin shares wings and feathers with Cloudlet, so it is the most similar.`, `يشترك Skyfin مع Cloudlet في الأجنحة والريش، لذا هو الأكثر شبهًا.`);
S('c4.t12.p', `Mossling has fur and four legs. Which known creature is it most similar to?`, `Mossling له فرو وأربع أرجل. أي مخلوق معروف هو الأكثر شبهًا به؟`);
S('c4.t12.a', `Emberfox`, `Emberfox`); S('c4.t12.b', `Skyfin`, `Skyfin`); S('c4.t12.c', `Ripple`, `Ripple`);
S('c4.t12.h1', `Look for the same body features.`, `ابحث عن الصفات الجسدية نفسها.`); S('c4.t12.h2', `Fur and four legs belong to one known creature.`, `الفرو والأرجل الأربع لمخلوق معروف واحد.`); S('c4.t12.ex', `Emberfox also has fur and four legs, so Mossling is most similar to it.`, `لـ Emberfox أيضًا فرو وأربع أرجل، لذا Mossling هو الأكثر شبهًا به.`);
S('c4.t13.p', `A gray Pebble creature is the same gray as Skyfin's wings. Should we call it a Bird because of the color?`, `مخلوق Pebble رمادي بنفس رمادية أجنحة Skyfin. هل نسميه Bird بسبب اللون؟`);
S('c4.t13.a', `No. Similar color does not matter for being a bird; compare features that matter`, `لا. تشابه اللون لا يهم لكونه طائرًا؛ قارن الـ Features المهمة`); S('c4.t13.b', `Yes. Same color means same class`, `نعم. نفس اللون يعني نفس الـ Class`); S('c4.t13.c', `Yes, any shared feature proves it`, `نعم، أي Feature مشتركة تثبت ذلك`);
S('c4.t13.h1', `Does color tell you whether something is a bird?`, `هل يخبرك اللون إن كان الشيء طائرًا؟`); S('c4.t13.h2', `Similarity only helps when we compare useful features.`, `التشابه يفيد فقط حين نقارن Features مفيدة.`); S('c4.t13.ex', `Looking alike on a feature that does not matter is misleading. Choose features that relate to the class.`, `التشابه في Feature لا يهم مضلّل. اختر Features مرتبطة بالـ Class.`);

/* ---------- scene 2: Measuring Grounds ---------- */
S('c4.tarn.in1', `Welcome to the Measuring Grounds!`, `أهلًا بكما في Measuring Grounds!`);
S('c4.s2.1', `Every creature stands on the spot that matches its features. Two numbers: size across, speed up.`, `يقف كل مخلوق على المكان الذي يطابق Features الخاصة به. رقمان: الحجم أفقيًا، والسرعة عموديًا.`);
S('c4.s2.2', `So closeness becomes a **distance** between two points!`, `إذن يصبح القرب **Distance** بين نقطتين!`);
S('c4.s2.3', `Exactly. Distance = √((x₂ − x₁)² + (y₂ − y₁)²). The straight line between the points.`, `بالضبط. Distance = √((x₂ − x₁)² + (y₂ − y₁)²). الخط المستقيم بين النقطتين.`);
S('c4.s2.4', `A new creature, Starling, just landed at (5, 4). Who is its nearest neighbor?`, `هبط مخلوق جديد اسمه Starling عند (5, 4). من أقرب جار له؟`);
S('c4.s2.win', `Starling's nearest neighbor is Skyfin, a Bird. So we predict Bird!`, `أقرب جار لـ Starling هو Skyfin وهو Bird. إذن نتوقع Bird!`);
S('c4.s2.win2', `The nearest known example guides the prediction. That is the **1-nearest-neighbor** method.`, `أقرب مثال معروف يوجّه الـ Prediction. هذه طريقة الـ **1-Nearest Neighbor**.`);
S('c4.s2.win3', `But close does not mean certain. It is only evidence.`, `لكن القرب لا يعني اليقين. إنه دليل فقط.`);
S('c4.s2.t1', `Sera in the Scale House, top right, has been measuring something odd. Go and see.`, `Sera في Scale House أعلى اليمين تقيس شيئًا غريبًا. اذهبا وانظرا.`);
S('c4.t2.title', `Measure the distance`, `قِس المسافة`);
S('c4.t21.p', `Starling is at (5, 4) and Skyfin is at (3, 4). What is the distance between them?`, `Starling عند (5, 4) وSkyfin عند (3, 4). كم المسافة بينهما؟`);
S('c4.t21.a', `2`, `2`); S('c4.t21.b', `4`, `4`); S('c4.t21.c', `8`, `8`);
S('c4.t21.h1', `They are on the same row. Only the horizontal gap counts.`, `هما على الصف نفسه. الفرق الأفقي وحده يُحتسب.`); S('c4.t21.h2', `5 minus 3.`, `5 ناقص 3.`); S('c4.t21.ex', `The y values are equal, so distance = √(2² + 0²) = 2.`, `قيمتا y متساويتان، لذا Distance = √(2² + 0²) = 2.`);
S('c4.t22.p', `Starling is at (5, 4) and Ripple is at (8, 2). Distance = √((8−5)² + (2−4)²). What is it, about?`, `Starling عند (5, 4) وRipple عند (8, 2). Distance = √((8−5)² + (2−4)²). كم تساوي تقريبًا؟`);
S('c4.t22.a', `About 3.61`, `حوالي 3.61`); S('c4.t22.b', `5`, `5`); S('c4.t22.c', `13`, `13`);
S('c4.t22.h1', `Subtract, square, add: 3² + 2².`, `اطرح، ثم ربّع، ثم اجمع: 3² + 2².`); S('c4.t22.h2', `That makes 13. Do not forget the square root at the end.`, `الناتج 13. لا تنسَ الجذر التربيعي في النهاية.`); S('c4.t22.ex', `3² + 2² = 13, and √13 is about 3.61. Without the square root you would get 13, which is not the distance.`, `3² + 2² = 13، و√13 تساوي حوالي 3.61. بدون الجذر التربيعي تحصل على 13 وهذه ليست المسافة.`);
S('c4.t23.p', `Starling is 2 away from Skyfin, about 3.61 from Ripple, and about 4.24 from Emberfox. Which is its nearest neighbor?`, `يبعد Starling مسافة 2 عن Skyfin، وحوالي 3.61 عن Ripple، وحوالي 4.24 عن Emberfox. من أقرب جار له؟`);
S('c4.t23.a', `Skyfin`, `Skyfin`); S('c4.t23.b', `Ripple`, `Ripple`); S('c4.t23.c', `Emberfox`, `Emberfox`);
S('c4.t23.h1', `The nearest neighbor has the smallest distance.`, `أقرب جار له أصغر مسافة.`); S('c4.t23.h2', `Compare 2, 3.61 and 4.24.`, `قارن 2 و3.61 و4.24.`); S('c4.t23.ex', `2 is the smallest distance, so Skyfin is the nearest neighbor.`, `2 هي أصغر مسافة، لذا Skyfin هو أقرب جار.`);
S('c4.t24.p', `Skyfin is a Bird and is Starling's nearest neighbor. What does the 1-nearest-neighbor method predict for Starling?`, `Skyfin هو Bird وهو أقرب جار لـ Starling. ماذا تتنبأ طريقة 1-Nearest Neighbor لـ Starling؟`);
S('c4.t24.a', `Bird, a prediction based on similarity, not a proof`, `Bird، وهو Prediction مبني على التشابه لا إثبات`); S('c4.t24.b', `Fish, because Ripple is also close`, `Fish، لأن Ripple قريب أيضًا`); S('c4.t24.c', `Nothing, it needs hours of training first`, `لا شيء، فهي تحتاج إلى ساعات من التدريب أولًا`);
S('c4.t24.h1', `Which class does the single nearest example have?`, `أي Class لأقرب مثال وحيد؟`); S('c4.t24.h2', `The method copies the class of the closest known example.`, `الطريقة تنسخ Class أقرب مثال معروف.`); S('c4.t24.ex', `The method copies the nearest example's class: Bird. It is a prediction from similarity and can be wrong.`, `تنسخ الطريقة Class أقرب مثال: Bird. هذا Prediction مبني على التشابه وقد يكون خاطئًا.`);
S('ax.size', `Size`, `Size`); S('ax.speed', `Speed`, `Speed`);

/* ---------- scene 3: the Scale House ---------- */
S('c4.s3.1', `Come in! Look at my scale. It reads in grams, and my rulers read in size units. Something is off.`, `تفضّلا! انظرا إلى ميزاني. يقرأ بالـ grams، ومساطري تقرأ بوحدات الحجم. هناك خطأ ما.`);
S('c4.s3.2', `What goes wrong?`, `ماذا يحدث؟`);
S('c4.s3.3', `When I measure distance between creatures, the weight number swallows everything else. Size seems not to matter.`, `حين أقيس المسافة بين المخلوقات يبتلع رقم الوزن كل شيء آخر. كأن الحجم لا يهم.`);
S('c4.s3.4', `Weight is thousands, size is single digits. The big numbers shout, the small ones whisper!`, `الوزن بالآلاف والحجم أرقام مفردة. الأرقام الكبيرة تصرخ والصغيرة تهمس!`);
S('c4.s3.5', `The cure is **feature scaling**: put every feature on a comparable range. **Min-max scaling** gives (x − min) ÷ (max − min), from 0 to 1.`, `العلاج هو **Feature Scaling**: وضع كل Feature على مدى مقارن. يعطي **Min-max Scaling** القيمة (x − min) ÷ (max − min) من 0 إلى 1.`);
S('c4.s3.6', `Another way is **standardization**: subtract the mean and divide by the standard deviation.`, `طريقة أخرى هي **Standardization**: اطرح المتوسط واقسم على الانحراف المعياري.`);
S('c4.s3.win', `Now size and weight speak with equal voices!`, `الآن يتحدث الحجم والوزن بصوتين متساويين!`);
S('c4.s3.win2', `Important: compute min and max from the training data only, and reuse them on new data.`, `مهم: احسب الـ min والـ max من بيانات التدريب فقط، وأعد استخدامهما على البيانات الجديدة.`);
S('c4.s3.win3', `Distance-based methods like nearest neighbors need scaling. Many other methods do not.`, `الطرق المعتمدة على المسافة مثل الـ Nearest Neighbors تحتاج إلى Scaling. كثير من الطرق الأخرى لا تحتاجه.`);
S('c4.s3.t1', `Now Elder Rowan can show you how many neighbors can vote. The Neighbor Stones are south of the village.`, `الآن يستطيع Elder Rowan أن يريكما كيف يصوّت عدة جيران. Neighbor Stones جنوب القرية.`);
S('c4.t3.title', `Fair measuring`, `قياس عادل`);
S('c4.col.size', `Size (1 to 10)`, `Size (من 1 إلى 10)`); S('c4.col.weight', `Weight in grams (1000 to 10000)`, `Weight بالـ grams (من 1000 إلى 10000)`); S('c4.col.name', `Creature`, `المخلوق`);
S('c4.t31.p', `Pebble is (size 5, weight 5000). Mossling is (6, 5100). Stoneback is (9, 5001). By raw distance, who is nearer to Pebble? Distances: Mossling √(1² + 100²) ≈ 100.005, Stoneback √(4² + 1²) ≈ 4.12.`, `Pebble هو (الحجم 5، الوزن 5000). Mossling هو (6, 5100). وStoneback هو (9, 5001). بالمسافة الخام، من الأقرب إلى Pebble؟ المسافات: Mossling √(1² + 100²) ≈ 100.005، وStoneback √(4² + 1²) ≈ 4.12.`);
S('c4.t31.a', `Stoneback, about 4.12`, `Stoneback، حوالي 4.12`); S('c4.t31.b', `Mossling, about 100`, `Mossling، حوالي 100`); S('c4.t31.c', `They are equally far`, `البعد متساوٍ بينهما`);
S('c4.t31.h1', `The nearest has the smaller distance.`, `الأقرب هو صاحب المسافة الأصغر.`); S('c4.t31.h2', `Compare 4.12 with 100.005.`, `قارن 4.12 مع 100.005.`); S('c4.t31.ex', `4.12 is smaller than 100.005, so raw distance says Stoneback. Notice that Mossling is much closer in size (6 versus 5).`, `4.12 أصغر من 100.005، لذا تقول المسافة الخام: Stoneback. لاحظ أن Mossling أقرب بكثير في الحجم (6 مقابل 5).`);
S('c4.t32.p', `Mossling's size is almost the same as Pebble's, yet raw distance calls it far. Why?`, `حجم Mossling يكاد يطابق حجم Pebble، ومع ذلك تعدّه المسافة الخام بعيدًا. لماذا؟`);
S('c4.t32.a', `The weight numbers are thousands, so a small weight gap outweighs the size gap in the distance`, `أرقام الوزن بالآلاف، فيطغى فرق وزن صغير على فرق الحجم في المسافة`); S('c4.t32.b', `Size is always less important than weight`, `الحجم دائمًا أقل أهمية من الوزن`); S('c4.t32.c', `The distance formula ignores weight`, `صيغة المسافة تتجاهل الوزن`);
S('c4.t32.h1', `Compare the size of the two gaps: 1 versus 100.`, `قارن حجم الفرقين: 1 مقابل 100.`); S('c4.t32.h2', `The formula treats every number the same, whatever its unit.`, `الصيغة تعامل كل رقم بالطريقة نفسها مهما كانت وحدته.`); S('c4.t32.ex', `The formula squares and adds every gap. A gap of 100 grams becomes 10000, dwarfing the size gap. The feature with larger numbers dominates.`, `الصيغة تربّع كل فرق وتجمعه. فرق 100 gram يصير 10000 فيطغى على فرق الحجم. الـ Feature ذات الأرقام الأكبر هي التي تهيمن.`);
S('c4.t33.p', `Min-max scaling: (x − min) ÷ (max − min). Size ranges from 1 to 10. What is Mossling's scaled size (size 6)?`, `Min-max Scaling: (x − min) ÷ (max − min). يتراوح الحجم من 1 إلى 10. كم الحجم بعد التحجيم لـ Mossling (الحجم 6)؟`);
S('c4.t33.a', `About 0.56`, `حوالي 0.56`); S('c4.t33.b', `0.60`, `0.60`); S('c4.t33.c', `6`, `6`);
S('c4.t33.h1', `x − min is 6 − 1.`, `x − min هي 6 − 1.`); S('c4.t33.h2', `max − min is 10 − 1 = 9. So 5 ÷ 9.`, `max − min هي 10 − 1 = 9. إذن 5 ÷ 9.`); S('c4.t33.ex', `(6 − 1) ÷ (10 − 1) = 5 ÷ 9 ≈ 0.56.`, `(6 − 1) ÷ (10 − 1) = 5 ÷ 9 ≈ 0.56.`);
S('c4.t34.p', `After scaling both features to 0–1: Pebble (0.44, 0.44), Mossling (0.56, 0.46), Stoneback (0.89, 0.44). Distances from Pebble: Mossling about 0.12, Stoneback about 0.44. Who is nearer now?`, `بعد تحجيم الـ Feature كلتيهما إلى 0–1: Pebble (0.44, 0.44) وMossling (0.56, 0.46) وStoneback (0.89, 0.44). المسافات من Pebble: Mossling حوالي 0.12 وStoneback حوالي 0.44. من الأقرب الآن؟`);
S('c4.t34.a', `Mossling, now the nearest`, `Mossling، وهو الأقرب الآن`); S('c4.t34.b', `Stoneback, as before`, `Stoneback، كما قبل`); S('c4.t34.c', `Scaling cannot change distances`, `التحجيم لا يغيّر المسافات`);
S('c4.t34.h1', `Which distance is smaller, 0.12 or 0.44?`, `أي مسافة أصغر، 0.12 أم 0.44؟`); S('c4.t34.h2', `Scaling changes how each feature counts toward distance.`, `التحجيم يغيّر وزن كل Feature في المسافة.`); S('c4.t34.ex', `0.12 < 0.44, so Mossling is nearest. After scaling, size and weight both count, and the ranking changes.`, `0.12 < 0.44، لذا Mossling هو الأقرب. بعد التحجيم يُحتسب الحجم والوزن معًا ويتغير الترتيب.`);
S('c4.t35.p', `Tap every true statement about scaling and nearest neighbors.`, `اضغط على كل عبارة صحيحة عن الـ Scaling والـ Nearest Neighbors.`);
S('c4.t35.h1', `Think about which numbers dominate a distance.`, `فكّر أي أرقام تهيمن على المسافة.`); S('c4.t35.h2', `Two of the four are true.`, `اثنتان من الأربع صحيحتان.`); S('c4.t35.ex', `Distances let big numbers dominate, and min-max scaling squeezes each feature into 0 to 1. Units cannot be compared as-is.`, `المسافات تدع الأرقام الكبيرة تهيمن، والـ Min-max Scaling يضغط كل Feature في المدى 0 إلى 1. لا يمكن مقارنة الوحدات كما هي.`);
S('c4.t35.1', `Features with large numbers can dominate a distance`, `الـ Features ذات الأرقام الكبيرة قد تهيمن على المسافة`); S('c4.t35.2', `Min-max scaling squeezes each feature into 0 to 1`, `Min-max Scaling يضغط كل Feature في المدى 0 إلى 1`);
S('c4.t35.3', `Scaling never matters for nearest neighbors`, `الـ Scaling لا يهم أبدًا للـ Nearest Neighbors`); S('c4.t35.4', `Grams and meters can be compared as they are`, `يمكن مقارنة الـ grams والـ meters كما هي`);

/* ---------- scene 4: Neighbor Stones ---------- */
S('c4.s4.1', `Welcome. Each of these stones remembers a creature. Ask them, and they vote.`, `أهلًا بكما. كل حجر من هذه الحجارة يتذكر مخلوقًا. اسألاها فتصوّت.`);
S('c4.s4.2', `One neighbor can be wrong. What about several?`, `جار واحد قد يخطئ. فماذا عن عدة جيران؟`);
S('c4.s4.3', `We call the number of neighbors **K**. With K = 3, the three nearest stones vote and the class with the most votes wins. That is **K-nearest neighbors**, or **KNN**.`, `نسمي عدد الجيران **K**. حين K = 3 تصوّت أقرب ثلاثة حجارة ويفوز الـ Class صاحب أكثر الأصوات. هذه هي **K-Nearest Neighbors** أو **KNN**.`);
S('c4.s4.4', `Let us try K = 1, 3 and 5 on a new creature.`, `لنجرّب K = 1 و3 و5 على مخلوق جديد.`);
S('c4.s4.5', `And K is not magic. We choose it by testing different values on validation data.`, `وK ليس سحرًا. نختاره بتجربة قيم مختلفة على بيانات الـ Validation.`);
S('c4.s4.win', `The stones agree: many neighbors are steadier than one.`, `تتفق الحجارة: عدة جيران أكثر ثباتًا من جار واحد.`);
S('c4.s4.win2', `We measured closeness, scaled the features and let neighbors vote. That is the whole method.`, `قسنا القرب، وحجّمنا الـ Features، وتركنا الجيران يصوّتون. هذه هي الطريقة كلها.`);
S('c4.s4.win3', `But even neighbors can be fooled by a bad number. Remember that, traveler.`, `لكن حتى الجيران يمكن خداعهم برقم سيئ. تذكّر ذلك أيها المسافر.`);
S('c4.s4.t1', `When you are ready, ask me for the Neighbor Trial.`, `حين تكونان مستعدين، اطلبا مني Neighbor Trial.`);
S('c4.t4.title', `Neighbors vote`, `الجيران يصوّتون`);
S('c4.t41.new', `A new creature (the question mark) stands at (5, 5). Ask the stones with K = 1, K = 3 and K = 5.`, `مخلوق جديد (علامة الاستفهام) يقف عند (5, 5). اسأل الحجارة بـ K = 1 وK = 3 وK = 5.`);
S('c4.t41.ask', `Ask with K = {k}`, `اسأل بـ K = {k}`);
S('c4.t41.says1', `K = 1: Skyfin votes Bird. Prediction: Bird.`, `K = 1: يصوّت Skyfin بـ Bird. التوقع: Bird.`);
S('c4.t41.says3', `K = 3: Skyfin Bird, Brookle Amphibian, Windle Bird. Bird 2, Amphibian 1. Prediction: Bird.`, `K = 3: Skyfin بـ Bird وBrookle بـ Amphibian وWindle بـ Bird. Bird 2 وAmphibian 1. التوقع: Bird.`);
S('c4.t41.says5', `K = 5: Bird 2, Amphibian 1, Fish 1, Mammal 1. Prediction: Bird.`, `K = 5: Bird 2 وAmphibian 1 وFish 1 وMammal 1. التوقع: Bird.`);
S('c4.t41.need', `Ask all three first.`, `اسأل الثلاثة أولًا.`);
S('c4.t41.p', `With K = 3, which class wins and how many votes does it get?`, `حين K = 3، أي Class يفوز وكم صوتًا يحصل؟`);
S('c4.t41.a', `Bird with 2 votes`, `Bird بصوتين`); S('c4.t41.b', `Amphibian with 2 votes`, `Amphibian بصوتين`); S('c4.t41.c', `Fish with 1 vote`, `Fish بصوت واحد`);
S('c4.t41.h1', `Count the three nearest stones' classes.`, `عُدّ Classes أقرب ثلاثة حجارة.`); S('c4.t41.h2', `Skyfin and Windle are both birds.`, `Skyfin وWindle كلاهما Bird.`); S('c4.t41.ex', `The three nearest are Skyfin (Bird), Brookle (Amphibian) and Windle (Bird): Bird wins 2 to 1.`, `أقرب ثلاثة هم Skyfin (Bird) وBrookle (Amphibian) وWindle (Bird): يفوز Bird بنتيجة 2 مقابل 1.`);
S('c4.t42.p', `Five nearest stones vote: Bird, Fish, Bird, Mammal, Amphibian. What does KNN predict?`, `صوّتت أقرب خمسة حجارة: Bird وFish وBird وMammal وAmphibian. ماذا تتنبأ KNN؟`);
S('c4.t42.a', `Bird, with the most votes (2)`, `Bird، لأنه حصل على أكثر الأصوات (2)`); S('c4.t42.b', `Fish, because it voted second`, `Fish، لأنه صوّت ثانيًا`); S('c4.t42.c', `It cannot decide at all`, `لا تستطيع أن تقرر إطلاقًا`);
S('c4.t42.h1', `Count the votes for each class.`, `عُدّ الأصوات لكل Class.`); S('c4.t42.h2', `One class has two votes, the others one.`, `Class واحد له صوتان والبقية صوت واحد.`); S('c4.t42.ex', `Bird has 2 votes, the others 1 each, so Bird has the most votes. It is a plurality, not a majority of 5.`, `Bird له صوتان والبقية صوت واحد، فهو صاحب أكثر الأصوات. هذه أغلبية نسبية لا أغلبية من 5.`);
S('c4.t43.p', `How should we choose K for a real problem?`, `كيف نختار K لمشكلة حقيقية؟`);
S('c4.t43.a', `Try several values and compare their results on validation data`, `نجرب عدة قيم ونقارن نتائجها على بيانات الـ Validation`); S('c4.t43.b', `Always use K = 1 because it is closest`, `نستخدم دائمًا K = 1 لأنه الأقرب`); S('c4.t43.c', `Pick the K that scores best on the test set, then report that score`, `نختار الـ K الأفضل على الـ Test set ثم نعلن تلك الدرجة`);
S('c4.t43.h1', `Remember the Test chamber from the Workshop.`, `تذكّر غرفة الـ Test من Workshop.`); S('c4.t43.h2', `Settings are tuned on validation data, never on the test set.`, `تُضبط الإعدادات على بيانات الـ Validation لا على الـ Test set أبدًا.`); S('c4.t43.ex', `Tune K on validation data. Using the test set to choose K would leak it, as in the Model Workshop.`, `اضبط K على بيانات الـ Validation. استخدام الـ Test set لاختيار K يسرّبه كما حدث في Model Workshop.`);

/* ---------- trial ---------- */
S('c4.r.title', `Neighbor Trial`, `Neighbor Trial`);
S('c4.r.h', `Think about what you learned about neighbors.`, `فكّر فيما تعلمته عن الجيران.`); S('c4.r.h2', `Remove the answers that make no sense, then compare the rest.`, `استبعد الإجابات غير المنطقية ثم قارن الباقي.`);
S('c4.r.1', `How does KNN predict the class of a new creature?`, `كيف تتنبأ KNN بـ Class مخلوق جديد؟`);
S('c4.r.1a', `It finds the K nearest known examples and takes their majority vote`, `تجد أقرب K مثالًا معروفًا وتأخذ أغلبية أصواتها`); S('c4.r.1b', `It builds a tree of yes/no questions`, `تبني شجرة من أسئلة نعم/لا`); S('c4.r.1c', `It picks the class with the biggest number in its features`, `تختار الـ Class صاحب أكبر رقم في Features`);
S('c4.r.ex1', `KNN looks at the K nearest known examples and lets them vote.`, `تنظر KNN إلى أقرب K مثالًا معروفًا وتدعها تصوّت.`);
S('c4.r.2', `Two creatures are at (2, 3) and (5, 7). What is the distance between them?`, `مخلوقان عند (2, 3) و(5, 7). كم المسافة بينهما؟`);
S('c4.r.2a', `5`, `5`); S('c4.r.2b', `7`, `7`); S('c4.r.2c', `25`, `25`);
S('c4.r.ex2', `√(3² + 4²) = √25 = 5.`, `√(3² + 4²) = √25 = 5.`);
S('c4.r.3', `Size ranges from 1 to 10, weight from 1000 to 10000 grams. Why scale before using raw distance?`, `يتراوح الحجم من 1 إلى 10 والوزن من 1000 إلى 10000 gram. لماذا نُحجّم قبل استخدام المسافة الخام؟`);
S('c4.r.3a', `So the large weight numbers do not dominate the distance`, `حتى لا تهيمن أرقام الوزن الكبيرة على المسافة`); S('c4.r.3b', `So the creatures become heavier`, `حتى تصبح المخلوقات أثقل`); S('c4.r.3c', `Because distance cannot use numbers`, `لأن المسافة لا تستطيع استخدام الأرقام`);
S('c4.r.ex3', `Scaling puts features on comparable ranges, so no feature dominates only because its numbers are bigger.`, `يضع الـ Scaling الـ Features على مدى مقارن فلا تهيمن Feature لمجرد أن أرقامها أكبر.`);
S('c4.r.4', `With K = 3, the nearest neighbors are Fish, Bird, Bird. What is the prediction?`, `حين K = 3 يكون أقرب الجيران Fish وBird وBird. ما التوقع؟`);
S('c4.r.4a', `Bird`, `Bird`); S('c4.r.4b', `Fish`, `Fish`); S('c4.r.4c', `Mammal`, `Mammal`);
S('c4.r.ex4', `Bird has 2 of the 3 votes.`, `Bird له صوتان من 3.`);
S('c4.r.5', `Where should the min and max for scaling be computed?`, `من أين نحسب الـ min والـ max للتحجيم؟`);
S('c4.r.5a', `From the training data only`, `من بيانات التدريب فقط`); S('c4.r.5b', `From all the data, including the test set`, `من كل البيانات بما فيها الـ Test set`); S('c4.r.5c', `From the first new example we meet`, `من أول مثال جديد نصادفه`);
S('c4.r.ex5', `Use the training data only, so information from the test set never leaks into preparation.`, `استخدم بيانات التدريب فقط حتى لا تتسرب معلومات الـ Test set إلى مرحلة التحضير.`);
S('c4.rank.5', `Valley Master`, `Valley Master`); S('c4.rank.3', `Neighbor Seeker`, `Neighbor Seeker`); S('c4.rank.0', `Young Apprentice`, `Young Apprentice`); S('c4.rank.t', `Rank: {r}`, `الرتبة: {r}`);
S('c4.trial.opt', `Begin the Neighbor Trial`, `ابدأ Neighbor Trial`);
S('c4.trial.1', `Five challenges, each about a different part of what you learned.`, `خمسة تحديات، كل منها عن جزء مختلف مما تعلمتماه.`);
S('c4.trial.2', `We are ready.`, `نحن مستعدان.`);
S('c4.trial.win', `You measure like true neighbors. The valley trusts you.`, `أنتما تقيسان مثل جيران حقيقيين. الوادي يثق بكما.`);
S('c4.trial.rumble', `Wait... the ground is trembling. Something heavy is rolling.`, `انتظروا... الأرض ترتجف. شيء ثقيل يتدحرج.`);
S('c4.trial.sera', `My old scale golem... It must have woken up. It comes from the Great Scale, at the east edge!`, `مارد الميزان القديم... لا بد أنه استيقظ. إنه قادم من Great Scale عند الحافة الشرقية!`);

/* ---------- side quests ---------- */
S('c4.sqT.name', `Which neighbor?`, `أي جار؟`); S('c4.sqT.opt', `Tarn: a tie between two neighbors`, `Tarn: تعادل بين جارين`);
S('c4.sqT.in', `A creature is exactly 2 away from both Skyfin (Bird) and Ripple (Fish). My method cannot pick. What would you do?`, `مخلوق يبعد 2 بالضبط عن Skyfin (Bird) وعن Ripple (Fish). لا تستطيع طريقتي أن تختار. ماذا تفعل؟`);
S('c4.sqT.done', `Another useful feature, like "has fins", breaks the tie fairly. Thank you!`, `Feature مفيدة أخرى مثل "له زعانف" تكسر التعادل بإنصاف. شكرًا لك!`);
S('c4.sqT.title', `A tie in distance`, `تعادل في المسافة`);
S('c4.sqT.p', `A creature is the same distance from a Bird and from a Fish. What is the best way to break the tie?`, `مخلوق يبعد المسافة نفسها عن Bird وعن Fish. ما أفضل طريقة لكسر التعادل؟`);
S('c4.sqT.a', `Add another useful feature, or ask more neighbors`, `نضيف Feature مفيدة أخرى، أو نسأل المزيد من الجيران`); S('c4.sqT.b', `Always pick the one listed first`, `نختار دائمًا الأول في القائمة`); S('c4.sqT.c', `Pick the one with the louder name`, `نختار صاحب الاسم الأعلى صوتًا`);
S('c4.sqT.h1', `A tie means the current features cannot separate them.`, `التعادل يعني أن الـ Features الحالية لا تفصل بينهما.`); S('c4.sqT.h2', `What new information would separate a bird from a fish?`, `أي معلومة جديدة تفصل الطائر عن السمكة؟`); S('c4.sqT.ex', `A new useful feature or more neighbors gives new evidence. Picking by list order or by name is arbitrary.`, `Feature جديدة مفيدة أو المزيد من الجيران يعطي دليلًا جديدًا. الاختيار بترتيب القائمة أو بالاسم عشوائي.`);
S('c4.sqU.name', `Tumble's units`, `وحدات Tumble`); S('c4.sqU.opt', `Tumble: grams and kilograms are mixed up`, `Tumble: اختلط الـ grams بالـ kilograms`);
S('c4.sqU.in', `I wrote some gem weights in grams and some in kilograms in the same table! Does it matter?`, `كتبت أوزان بعض الجواهر بالـ grams وبعضها بالـ kilograms في الجدول نفسه! هل يهم ذلك؟`);
S('c4.sqU.done', `Same unit for the whole column. My table is fixed!`, `وحدة واحدة للعمود كله. تم إصلاح جدولي!`);
S('c4.sqU.title', `Mixed units`, `وحدات مختلطة`);
S('c4.sqU.p', `One gem weighs "5" (kilograms) and another "5000" (grams) in the same column. What should happen before computing distance?`, `جوهرة وزنها "5" (kilograms) وأخرى "5000" (grams) في العمود نفسه. ماذا يجب أن يحدث قبل حساب المسافة؟`);
S('c4.sqU.a', `Convert them to the same unit first`, `نحوّلها إلى وحدة واحدة أولًا`); S('c4.sqU.b', `Nothing, the distance formula fixes units`, `لا شيء، فصيغة المسافة تصلح الوحدات`); S('c4.sqU.c', `Delete the weight column`, `نحذف عمود الوزن`);
S('c4.sqU.h1', `Are 5 and 5000 describing the same weight?`, `هل 5 و5000 تصفان الوزن نفسه؟`); S('c4.sqU.h2', `They do, but the numbers look wildly different.`, `نعم، لكن الرقمين يبدوان مختلفين جدًا.`); S('c4.sqU.ex', `Both are 5 kg, but the numbers differ by 1000×. Always use one unit per feature before measuring distance.`, `كلاهما 5 kg لكن الرقمين يختلفان بمقدار 1000 مرة. استخدم دائمًا وحدة واحدة لكل Feature قبل قياس المسافة.`);
S('c4.sqR.name', `The odd one out`, `الشاذ بين الجيران`); S('c4.sqR.opt', `Elder Rowan: one odd neighbor`, `Elder Rowan: جار شاذ`);
S('c4.sqR.in', `A creature sits among four Birds, but one mislabeled Fish stone is right next to it. Which K is safer?`, `مخلوق بين أربعة Birds لكن حجر Fish مصنّف خطأً بجواره تمامًا. أي K أكثر أمانًا؟`);
S('c4.sqR.done', `Yes. One odd neighbor cannot outvote four. Many neighbors protect against noise.`, `نعم. جار شاذ واحد لا يستطيع التغلب على أربعة. كثرة الجيران تحمي من الضوضاء.`);
S('c4.sqR.title', `The odd neighbor`, `الجار الشاذ`);
S('c4.sqR.p', `The nearest stone is a mislabeled Fish. The next four are Birds. Which K gives the safer prediction?`, `أقرب حجر هو Fish مصنّف خطأً. والأربعة التالية Birds. أي K يعطي توقعًا أكثر أمانًا؟`);
S('c4.sqR.a', `K = 5: the four Birds outvote the odd one`, `K = 5: الـ Birds الأربعة يتغلبون على الشاذ`); S('c4.sqR.b', `K = 1: only the closest matters`, `K = 1: الأقرب وحده المهم`); S('c4.sqR.c', `Both are equally safe`, `كلاهما آمن بالقدر نفسه`);
S('c4.sqR.h1', `With K = 1, who decides?`, `حين K = 1، من يقرر؟`); S('c4.sqR.h2', `With K = 5, how many votes does the odd stone get?`, `حين K = 5، كم صوتًا يحصل الحجر الشاذ؟`); S('c4.sqR.ex', `K = 1 follows the single mislabeled neighbor. K = 5 gives it only 1 vote against 4.`, `K = 1 يتبع الجار الوحيد المصنّف خطأً. أما K = 5 فيعطيه صوتًا واحدًا مقابل 4.`);

/* ---------- boss: Bulk ---------- */
S('c4.b.1', `The biggest number is the most important number! My scale says so!`, `أكبر رقم هو أهم رقم! ميزاني يقول ذلك!`);
S('c4.b.2', `Your scale shouts one feature and ignores the rest.`, `ميزانك يصرخ بـ Feature واحدة ويتجاهل البقية.`);
S('c4.b.3', `Nobody in the valley can find their true neighbors anymore.`, `لم يعد أحد في الوادي يجد جيرانه الحقيقيين.`);
S('c4.b.4', `The size and the weight should both be heard. We need to put them on comparable ranges.`, `ينبغي أن يُسمع الحجم والوزن معًا. علينا أن نضعهما على مدى مقارن.`);
S('c4.b.5', `Small numbers do not matter! Prove me wrong!`, `الأرقام الصغيرة لا تهم! أثبتا أنني مخطئ!`);
S('c4.b.6', `We will.`, `سنفعل.`);
S('c4.b.start', `Bulk, the Loudest Number`, `Bulk, the Loudest Number`);
S('c4.bw.1', `I did not hear the small ones.`, `لم أسمع الأرقام الصغيرة.`);
S('c4.bw.2', `They were there all along.`, `كانت هناك طوال الوقت.`);
S('c4.bw.3', `The loudest signal is often the least careful.`, `أعلى إشارة كثيرًا ما تكون الأقل حرصًا.`);
S('c4.bw.4', `Features must be compared on a fair scale before we trust a distance.`, `يجب مقارنة الـ Features على مقياس عادل قبل أن نثق بالمسافة.`);
S('c4.cbulk.win', `I listen to every number now. Even the quiet ones.`, `أصغي إلى كل رقم الآن. حتى الهادئة منها.`);
S('c4.frag', `Core Fragment 4 of 6 obtained.`, `تم الحصول على Core Fragment 4 من 6.`);
S('c4.mem', `A memory... The Core once said: "Your report is too small to matter."`, `ذكرى... قال الـ Core ذات مرة: "تقريرك صغير جدًا بحيث لا يهم."`);
S('c4.mem2', `Small things matter too. We will remember them.`, `الأشياء الصغيرة تهم أيضًا. سنتذكرها.`);
S('c4.rowan.gift', `Take this crystal. It glows when a road leads somewhere new.`, `خذا هذه البلورة. تتوهج حين يقود الطريق إلى مكان جديد.`);
S('c4.br.1', `The road climbs toward a valley of farms and weather. Farmers there need a number, not a name.`, `يصعد الطريق نحو وادٍ للمزارع والطقس. المزارعون هناك يحتاجون إلى رقم لا إلى اسم.`);
S('c4.br.2', `A number, not a class... Then let us learn to predict numbers.`, `رقم لا Class... إذن لنتعلم أن نتنبأ بالأرقام.`);
S('b4.ph1', `Phase 1: The Loud Scale`, `المرحلة 1: The Loud Scale`);
S('b4.ph2', `Phase 2: Shrink the Giants`, `المرحلة 2: Shrink the Giants`);
S('b4.ph3', `Phase 3: Fair Distance`, `المرحلة 3: Fair Distance`);
S('b4.ph4', `Phase 4: Fit on Training Only`, `المرحلة 4: Fit on Training Only`);
S('b4.taunt', `Bulk stomps. The biggest number still looks important to him. Try again.`, `يدبّ Bulk بقدميه. ما زال أكبر رقم يبدو له الأهم. حاول مرة أخرى.`);
S('b4.vict', `Bulk has been convinced! The Great Scale will read every feature fairly.`, `تم إقناع Bulk! ستقرأ Great Scale كل Feature بإنصاف.`);
S('b4.rCodex', `Codex: Feature scaling`, `Codex: Feature scaling`);
S('end4.title', `Valley of Neighbors restored`, `تمت استعادة Valley of Neighbors`);
S('end4.body', `You measured distances, scaled features, let neighbors vote and kept the test data out of preparation.`, `قسمتما المسافات، وحجّمتما الـ Features، وتركتما الجيران يصوّتون، وأبقيتما بيانات الـ Test خارج مرحلة التحضير.`);
S('end4.cliff', `The road climbs toward the Valley of Predictions. Chapter 5 is coming soon.`, `يصعد الطريق نحو Valley of Predictions. الفصل 5 قادم قريبًا.`);
S('end4.frag', `Core Fragment 4 of 6`, `Core Fragment 4 من 6`); S('end4.concept', `Scaling skill`, `مهارة الـ Scaling`);
S('chapter.end4', `Chapter 4 complete`, `اكتمل الفصل 4`);
S('j4.1', `Village of Similarities`, `Village of Similarities`); S('j4.2', `The Measuring Grounds`, `The Measuring Grounds`); S('j4.3', `The Scale House`, `The Scale House`); S('j4.4', `The Neighbor Stones`, `The Neighbor Stones`); S('j4.5', `The Neighbor Trial`, `The Neighbor Trial`); S('j4.6', `Face Bulk at the Great Scale`, `واجه Bulk عند Great Scale`); S('j4.7', `Leave the valley`, `غادر الوادي`);
S('map.b4', `Bulk`, `Bulk`);

/* boss data */
S('c4.bt.name', `Creature`, `المخلوق`);
Q('q4.1', [`Query Dot is (size 3, weight 2000 g). Moss is (4, 2400 g) and Stone is (9, 2010 g). By raw distance (Moss ≈ 400.0, Stone ≈ 11.7), who is the nearest neighbor?`, `المخلوق Dot هو (الحجم 3، الوزن 2000 g). وMoss هو (4, 2400 g) وStone هو (9, 2010 g). بالمسافة الخام (Moss ≈ 400.0 وStone ≈ 11.7) من أقرب جار؟`],
  [`Stone, with the smaller distance (11.7)`, `Stone، لأن مسافته أصغر (11.7)`], [`Moss, because its size is closer`, `Moss، لأن حجمه أقرب`], [`They tie`, `متعادلان`],
  [`The nearest neighbor has the smallest distance.`, `أقرب جار له أصغر مسافة.`], [`Compare 11.7 and 400.0.`, `قارن 11.7 و400.0.`],
  [`Raw distance gives Stone (11.7) because weight differences are tiny there. But Stone's size, 9, is far from Dot's 3, and raw distance barely notices.`, `المسافة الخام تعطي Stone (11.7) لأن فروق الوزن عنده صغيرة. لكن حجم Stone وهو 9 بعيد عن 3 عند Dot، والمسافة الخام لا تكاد تلاحظ ذلك.`]);
Q('q4.2', [`The same creatures with weight in kilograms: Dot (3, 2.0), Moss (4, 2.4), Stone (9, 2.01). Now Moss ≈ 1.08 and Stone ≈ 6.0. What does this show?`, `المخلوقات نفسها بالوزن بالـ kilograms: Dot (3, 2.0) وMoss (4, 2.4) وStone (9, 2.01). الآن Moss ≈ 1.08 وStone ≈ 6.0. ماذا يعني هذا؟`],
  [`Changing the unit changes the nearest neighbor, so raw distance depends on units`, `تغيير الوحدة يغيّر أقرب جار، فالمسافة الخام تعتمد على الوحدات`], [`Kilograms are always more accurate than grams`, `الـ kilograms أدق دائمًا من الـ grams`], [`Nothing changed, the neighbor is the same`, `لم يتغير شيء، الجار نفسه`],
  [`Who was nearest before, and who is nearest now?`, `من كان الأقرب قبل ذلك ومن الأقرب الآن؟`], [`The creatures did not change, only the unit.`, `المخلوقات لم تتغير، تغيرت الوحدة فقط.`],
  [`Before the nearest was Stone, now it is Moss. The creatures are the same, so the answer should not depend on the unit. Scaling fixes this.`, `كان الأقرب Stone والآن هو Moss. المخلوقات نفسها، لذا يجب ألا تعتمد الإجابة على الوحدة. الـ Scaling يحل هذا.`]);
Q('q4.3', [`What is the best fix for a distance that depends on units?`, `ما أفضل حل لمسافة تعتمد على الوحدات؟`],
  [`Scale the features to comparable ranges before measuring distance`, `حجّم الـ Features إلى مدى مقارن قبل قياس المسافة`], [`Delete the feature with the biggest numbers`, `احذف الـ Feature ذات الأرقام الأكبر`], [`Multiply the small feature by a random number`, `اضرب الـ Feature الصغيرة برقم عشوائي`],
  [`We want every feature to count fairly.`, `نريد أن تُحتسب كل Feature بإنصاف.`], [`Deleting a feature throws away information.`, `حذف Feature يرمي معلومات.`],
  [`Feature scaling gives features comparable ranges, so no feature wins only by having bigger numbers.`, `يعطي Feature Scaling الـ Features مدى مقارنًا فلا تفوز Feature لمجرد أن أرقامها أكبر.`]);
const BMM = [{ x: 4, c: 0.33, w: ['0.40', '4'] }, { x: 7, c: 0.67, w: ['0.70', '7'] }];
H('q4.4', [`Min-max scaling with range 1 to 10. What is the scaled value of size {x}?`, `Min-max Scaling بمدى من 1 إلى 10. كم القيمة بعد التحجيم للحجم {x}؟`],
  [`Use (x − min) ÷ (max − min).`, `استخدم (x − min) ÷ (max − min).`], [`max − min is 9.`, `max − min تساوي 9.`],
  [`(x − 1) ÷ 9. For size 4 that is 3 ÷ 9 ≈ 0.33; for size 7 it is 6 ÷ 9 ≈ 0.67.`, `(x − 1) ÷ 9. للحجم 4 تساوي 3 ÷ 9 ≈ 0.33، وللحجم 7 تساوي 6 ÷ 9 ≈ 0.67.`]);
const BSD = [{ x: 8, z: '1.5', w: ['3', '0.5'] }, { x: 3, z: '−1', w: ['−2', '1'] }];
H('q4.5', [`Standardization: z = (x − mean) ÷ standard deviation. The mean is 5 and the standard deviation is 2. What is z for x = {x}?`, `Standardization: z = (x − mean) ÷ standard deviation. المتوسط 5 والانحراف المعياري 2. كم z للقيمة x = {x}؟`],
  [`Subtract the mean first.`, `اطرح المتوسط أولًا.`], [`Then divide by 2.`, `ثم اقسم على 2.`],
  [`(8 − 5) ÷ 2 = 1.5 and (3 − 5) ÷ 2 = −1. A negative z means below average.`, `(8 − 5) ÷ 2 = 1.5 و(3 − 5) ÷ 2 = −1. الـ z السالب يعني أقل من المتوسط.`]);
Q('q4.6', [`What is the difference between min-max scaling and standardization?`, `ما الفرق بين Min-max Scaling وStandardization؟`],
  [`Min-max uses min and max to fit 0 to 1; standardization uses mean and spread, centering at 0`, `يستخدم Min-max القيمتين min وmax ليناسب المدى 0 إلى 1، وتستخدم Standardization المتوسط والانتشار وتتمركز حول 0`], [`They are the same thing with different names`, `هما الشيء نفسه باسمين مختلفين`], [`Min-max changes the classes, standardization does not`, `Min-max يغيّر الـ Classes أما Standardization فلا`],
  [`Look at which numbers each formula uses.`, `انظر أي أرقام تستخدمها كل صيغة.`], [`One gives a range of 0 to 1; the other centers values around 0.`, `إحداهما تعطي مدى 0 إلى 1 والأخرى تمركز القيم حول 0.`],
  [`Min-max: (x − min) ÷ (max − min). Standardization: (x − mean) ÷ standard deviation. Both put features on comparable scales.`, `Min-max: (x − min) ÷ (max − min). وStandardization: (x − mean) ÷ standard deviation. كلتاهما تضع الـ Features على مقاييس مقارنة.`]);
Q('q4.7', [`After min-max scaling: Dot (0.22, 0.11), Moss (0.33, 0.16), Stone (0.89, 0.11). Distances from Dot: Moss about 0.12, Stone about 0.67. Who is the nearest neighbor now?`, `بعد Min-max Scaling: Dot (0.22, 0.11) وMoss (0.33, 0.16) وStone (0.89, 0.11). المسافات من Dot: Moss حوالي 0.12 وStone حوالي 0.67. من أقرب جار الآن؟`],
  [`Moss, about 0.12`, `Moss، حوالي 0.12`], [`Stone, about 0.67`, `Stone، حوالي 0.67`], [`They tie`, `متعادلان`],
  [`Which is smaller, 0.12 or 0.67?`, `أيهما أصغر، 0.12 أم 0.67؟`], [`This matches the kilogram answer.`, `هذا يطابق إجابة الـ kilograms.`],
  [`0.12 < 0.67, so Moss is nearest, the same answer as with kilograms. Scaling makes the result stop depending on units.`, `0.12 < 0.67 لذا Moss هو الأقرب، وهي إجابة الـ kilograms نفسها. الـ Scaling يوقف اعتماد النتيجة على الوحدات.`]);
Q('q4.8', [`With K = 5 on the scaled data, the neighbors vote: Amphibian, Bird, Amphibian, Mammal, Amphibian. What does KNN predict?`, `مع K = 5 على البيانات المُحجَّمة صوّت الجيران: Amphibian وBird وAmphibian وMammal وAmphibian. ماذا تتنبأ KNN؟`],
  [`Amphibian, with 3 votes out of 5`, `Amphibian، بـ 3 أصوات من 5`], [`Bird, because it appears second`, `Bird، لأنه يظهر ثانيًا`], [`Mammal, because it is rarest`, `Mammal، لأنه الأندر`],
  [`Count the votes for each class.`, `عُدّ الأصوات لكل Class.`], [`One class appears three times.`, `Class واحد يظهر ثلاث مرات.`],
  [`Amphibian has 3 votes, Bird 1, Mammal 1. The class with the most votes wins.`, `Amphibian له 3 أصوات وBird 1 وMammal 1. الـ Class صاحب أكثر الأصوات يفوز.`]);
S('q4.9.p', `Put the correct preparation steps in order.`, `رتّب خطوات التحضير الصحيحة.`);
S('q4.9.h1', `Split first, before computing anything from the data.`, `قسّم أولًا قبل أن تحسب أي شيء من البيانات.`); S('q4.9.h2', `Learn the min and max from training, then apply them to both sets.`, `تعلّم الـ min والـ max من التدريب ثم طبّقهما على المجموعتين.`);
S('q4.9.ex', `Split the data, compute min and max from the training set only, scale both sets with those numbers, then run KNN and score the test set.`, `قسّم البيانات، واحسب min وmax من مجموعة التدريب فقط، وحجّم المجموعتين بهذين الرقمين، ثم شغّل KNN وقيّم الـ Test set.`);
S('q4.9.s1', `Split the data into training and test sets`, `قسّم البيانات إلى مجموعتي تدريب واختبار`); S('q4.9.s2', `Compute min and max from the training set only`, `احسب min وmax من مجموعة التدريب فقط`);
S('q4.9.s3', `Scale both sets with those same numbers`, `حجّم المجموعتين بالرقمين نفسيهما`); S('q4.9.s4', `Run KNN and score it on the test set`, `شغّل KNN وقيّمها على الـ Test set`);
S('q4.9.order', `Your order: {x}`, `ترتيبك: {x}`);
Q('q4.10', [`Bulk computes min and max from ALL the data, including the test set, before splitting. What is wrong with that?`, `يحسب Bulk الـ min والـ max من كل البيانات بما فيها الـ Test set قبل التقسيم. ما الخطأ في ذلك؟`],
  [`Information from the test set leaks into the preparation, so the test score can look too good`, `تتسرب معلومات الـ Test set إلى التحضير فقد تبدو درجة الاختبار أفضل مما ينبغي`], [`Nothing, more data is always better`, `لا شيء، فالمزيد من البيانات أفضل دائمًا`], [`It only matters for very large datasets`, `لا يهم إلا للبيانات الكبيرة جدًا`],
  [`Remember data leakage in the Model Workshop.`, `تذكّر Data Leakage في Model Workshop.`], [`The test set must stay unseen until the final score.`, `يجب أن تبقى الـ Test set غير مرئية حتى الدرجة النهائية.`],
  [`Using the test set to compute scaling numbers is leakage. Fit the scaler on training data only, then reuse it on the test set.`, `استخدام الـ Test set لحساب أرقام التحجيم هو Leakage. اضبط الـ Scaler على بيانات التدريب فقط ثم أعد استخدامه على الـ Test set.`]);

/* ---------- codex ---------- */
CODEX.push('similar', 'distance', 'scaling', 'knn');
S('cx.similar.term', `Similarity`, `Similarity`); S('cx.similar.body', `Examples with similar features often belong to the same class, but only features that matter should be compared.`, `الأمثلة ذات الـ Features المتشابهة كثيرًا ما تنتمي إلى الـ Class نفسه، لكن ينبغي مقارنة الـ Features المهمة فقط.`);
S('cx.distance.term', `Distance`, `Distance`); S('cx.distance.body', `A number saying how far apart two examples are. Euclidean distance is the straight line: √((x₂ − x₁)² + (y₂ − y₁)²). A smaller distance means more similar.`, `رقم يقول كم يبعد مثالان عن بعضهما. Euclidean Distance هي الخط المستقيم: √((x₂ − x₁)² + (y₂ − y₁)²). المسافة الأصغر تعني تشابهًا أكبر.`);
S('cx.scaling.term', `Feature scaling`, `Feature scaling`); S('cx.scaling.body', `Putting features on comparable ranges so none dominates just because its numbers are bigger. Min-max scaling gives 0 to 1; standardization centers at 0. Fit the scaler on training data only.`, `وضع الـ Features على مدى مقارن حتى لا تهيمن إحداها لمجرد أن أرقامها أكبر. يعطي Min-max Scaling مدى 0 إلى 1، وStandardization تمركز عند 0. اضبط الـ Scaler على بيانات التدريب فقط.`);
S('cx.knn.term', `K-nearest neighbors`, `K-nearest neighbors`); S('cx.knn.body', `Predict by finding the K closest known examples and taking a majority vote. Small K can follow noise; large K can blur classes. Choose K using validation data.`, `التنبؤ بإيجاد أقرب K مثالًا معروفًا وأخذ تصويت الأغلبية. K الصغير قد يتبع الضوضاء وK الكبير قد يطمس الـ Classes. اختر K باستخدام بيانات الـ Validation.`);
