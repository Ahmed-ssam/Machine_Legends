'use strict';
/* ===== text7.js: city 5 (Valley of Predictions) strings, EN / AR ===== */
S('room.fields', `Valley of Predictions: Harvest Fields`, `Valley of Predictions: Harvest Fields`);
S('room.tower', `Valley of Predictions: Linekeeper's Tower`, `Valley of Predictions: Linekeeper's Tower`);
S('room.hall', `Valley of Predictions: Hall of Errors`, `Valley of Predictions: Hall of Errors`);
S('room.temple', `Valley of Predictions: Temple of Balance`, `Valley of Predictions: Temple of Balance`);
S('room.courtyard', `Valley of Predictions: Temple Courtyard`, `Valley of Predictions: Temple Courtyard`);
S('spk.lin', `Professor Lin`, `Professor Lin`); S('spk.sage1', `The Simple Sage`, `The Simple Sage`); S('spk.sage2', `The Complex Sage`, `The Complex Sage`); S('spk.rote', `Rote`, `Rote`); S('spk.citizen', `Citizen`, `Citizen`);
S('obj5.travel', `Take the east road out of the Great Scale yard, or open the map (M).`, `اتبع الطريق الشرقي خارج ساحة Great Scale، أو افتح الخريطة (M).`);
S('obj5.rowan', `Speak with Elder Rowan in the Harvest Fields.`, `تحدّث مع Elder Rowan في Harvest Fields.`);
S('obj5.tower', `Enter the Linekeeper's Tower, north of the fields, and speak with Professor Lin.`, `ادخل Linekeeper's Tower شمال الحقول وتحدّث مع Professor Lin.`);
S('obj5.hall', `Follow Professor Lin to the Hall of Errors, the building at the top right.`, `اتبع Professor Lin إلى Hall of Errors، المبنى في أعلى اليمين.`);
S('obj5.lin', `Speak with Professor Lin.`, `تحدّث مع Professor Lin.`);
S('obj5.temple', `Walk east to the Temple of Balance.`, `امشِ شرقًا إلى Temple of Balance.`);
S('obj5.sages', `Meet the Two Sages in the temple.`, `قابل The Two Sages في المعبد.`);
S('obj5.courtyard', `Go through the opened gate at the north of the temple.`, `اعبر البوابة المفتوحة في شمال المعبد.`);
S('obj5.boss', `Face Rote in the courtyard.`, `واجه Rote في الساحة.`);
S('obj5.path', `Take the road east, toward the river mouth.`, `اتبع الطريق شرقًا نحو مصب النهر.`);
S('lock.tower5', `The tower door is shut. Elder Rowan has something to show you first.`, `باب البرج مغلق. لدى Elder Rowan ما يريكما إياه أولًا.`);
S('lock.hall5', `The Hall of Errors is locked. Professor Lin will take you there once you learn the line.`, `Hall of Errors مغلقة. سيأخذكما Professor Lin إليها حين تتعلمان الخط.`);
S('lock.temple5', `The road to the Temple of Balance is closed until you can measure errors.`, `الطريق إلى Temple of Balance مغلق حتى تتعلما قياس الأخطاء.`);
S('lock.gate5', `The temple's inner gate is sealed. The Two Sages must show you balance first.`, `البوابة الداخلية للمعبد مغلقة. على The Two Sages أن يريكما التوازن أولًا.`);
S('lock.path5', `The road is blocked by the temple's guardian.`, `الطريق مسدود بسبب حارس المعبد.`);
S('tile.slate5', `A slate covered in numbers: rainfall, sunlight hours, baskets. Everyone here counts.`, `لوح مغطى بالأرقام: المطر وساعات الشمس والسلال. الجميع هنا يعدّون.`);
S('tile.report5', `A page pinned to the wall, in tidy handwriting: "These models perform perfectly here. I do not know what happens beyond these walls."`, `ورقة مثبّتة على الجدار بخط مرتب: "هذه الـ Models تعمل بشكل مثالي هنا. لا أعرف ماذا يحدث خارج هذه الجدران."`);
S('end4.cliff', `A road climbs toward the Valley of Predictions.`, `يصعد طريق نحو Valley of Predictions.`);
S('c5.a1', `A broad valley of wheat and rivers. Farmers stand at the field edges holding slates covered in numbers.`, `وادٍ واسع من القمح والأنهار. يقف المزارعون عند أطراف الحقول وبأيديهم ألواح مغطاة بالأرقام.`);
S('c5.a2', `Welcome, traveler! Our fields are full of life, but we have a problem.`, `أهلًا أيها المسافر! حقولنا مليئة بالحياة، لكن لدينا مشكلة.`);
S('c5.rowan.wait', `Come and find me in the fields when you are ready.`, `ابحثا عني في الحقول حين تكونان مستعدين.`);
S('c5.rowan.idle', `Numbers on the slates are making sense at last. Thank you.`, `الأرقام على الألواح صارت مفهومة أخيرًا. شكرًا لكما.`);
S('c5.rowan.win', `The Temple's guardian is wise again. Our harvests will be planned well.`, `حارس المعبد حكيم من جديد. ستُخطَّط حصادنا جيدًا.`);
S('c5.tumble.idle', `Fruit by the kilo, a price for every weight!`, `فاكهة بالـ kilo وسعر لكل وزن!`);
S('c5.lin.wait', `Elder Rowan wants to talk with you first. The tower will wait.`, `يريد Elder Rowan أن يتحدث معكما أولًا. البرج ينتظر.`);
S('c5.lin.idle', `A line is a model. Check it before you trust it.`, `الخط Model. افحصه قبل أن تثق به.`);
S('c5.sage1.idle', `I must learn more than a single rigid rule.`, `يجب أن أتعلم أكثر من قاعدة واحدة جامدة.`);
S('c5.sage2.idle', `I must stop memorizing every detail and learn the underlying pattern.`, `يجب أن أكف عن حفظ كل تفصيل وأتعلم النمط الكامن.`);

/* scene 1 */
S('c5.s1.1', `We can tell whether a harvest might be good or bad... yet we cannot estimate how many baskets of wheat it will produce.`, `نستطيع أن نعرف إن كان الحصاد جيدًا أو سيئًا... لكننا لا نستطيع تقدير كم سلة قمح سينتج.`);
S('c5.s1.2', `Good or bad is a category. Baskets is a number. A different kind of question.`, `جيد أو سيئ هو Category. أما عدد السلال فهو رقم. نوع مختلف من الأسئلة.`);
S('c5.s1.3', `Can your learning companion predict a number, rather than simply choose a category?`, `هل يستطيع رفيقكما المتعلم أن يتنبأ برقم بدل أن يختار فئة فقط؟`);
S('c5.s1.4', `I think it can. But we need to teach it using examples.`, `أظن ذلك. لكن علينا أن نعلّمه بالأمثلة.`);
S('c5.s1.5', `Then let us begin! Some fields receive more sunlight, and some receive less. Their harvests are different.`, `إذن لنبدأ! بعض الحقول تتلقى شمسًا أكثر وبعضها أقل. وحصادها مختلف.`);
S('c5.s1.win', `Now I understand! A prediction does not always need to be a name or a category. Sometimes, it must be a number.`, `الآن فهمت! الـ Prediction لا يلزم أن يكون اسمًا أو فئة. أحيانًا يجب أن يكون رقمًا.`);
S('c5.s1.win2', `Exactly. Predicting a number is called **regression**. The number we predict is the **label** or target.`, `بالضبط. التنبؤ برقم يسمى **Regression**. والرقم الذي نتنبأ به هو الـ **Label** أو الهدف.`);
S('c5.s1.win3', `We have learned to predict quantities. Next, we will discover how a model can learn a mathematical line from examples.`, `تعلمنا أن نتنبأ بالكميات. بعد ذلك سنكتشف كيف يتعلم Model خطًا رياضيًا من الأمثلة.`);
S('c5.s1.t1', `The Linekeeper's Tower, north of the fields, is where Professor Lin studies patterns. Go and meet her.`, `Linekeeper's Tower شمال الحقول، حيث تدرس Professor Lin الأنماط. اذهبا والتقيا بها.`);
S('c5.t1.title', `The Harvest of Numbers`, `The Harvest of Numbers`);
S('c5.col.sun', `Sunlight hours (feature)`, `Sunlight hours (Feature)`); S('c5.col.bask', `Wheat harvest (label)`, `Wheat harvest (Label)`);
S('c5.new', `5 (new field)`, `5 (حقل جديد)`); S('c5.q', `?`, `?`);
S('c5.t11.p', `A new field receives 5 sunlight hours. Using the table (this is a simple made-up example, not real crop science), what harvest do you predict?`, `يتلقى حقل جديد 5 ساعات من الشمس. باستخدام الجدول (وهذا مثال بسيط مصطنع وليس علم محاصيل حقيقيًا)، أي حصاد تتوقع؟`);
S('c5.t11.a', `22 baskets`, `22 سلة`); S('c5.t11.b', `20 baskets`, `20 سلة`); S('c5.t11.c', `A good harvest`, `حصاد جيد`);
S('c5.t11.h1', `Look at how the harvest grows each time the sunlight grows.`, `انظر كيف يزداد الحصاد كلما زادت الشمس.`); S('c5.t11.h2', `Each extra hour adds 4 baskets... 4 hours gives 18, 6 hours gives 26.`, `كل ساعة إضافية تضيف 4 سلال... 4 ساعات تعطي 18 و6 ساعات تعطي 26.`); S('c5.t11.ex', `The pattern is y = 4x + 2, so for x = 5 we get 4 × 5 + 2 = 22 baskets. "A good harvest" is a category, not a number.`, `النمط هو y = 4x + 2، لذا عند x = 5 نحصل على 4 × 5 + 2 = 22 سلة. "حصاد جيد" فئة وليست رقمًا.`);
S('c5.t12.p', `Which question is a regression question?`, `أي سؤال هو سؤال Regression؟`);
S('c5.t12.a', `How many baskets will this field produce?`, `كم سلة سينتج هذا الحقل؟`); S('c5.t12.b', `Will this harvest be good or bad?`, `هل سيكون هذا الحصاد جيدًا أم سيئًا؟`); S('c5.t12.c', `Is this crop wheat or barley?`, `هل هذا المحصول قمح أم شعير؟`);
S('c5.t12.h1', `Regression predicts a number.`, `الـ Regression يتنبأ برقم.`); S('c5.t12.h2', `Which answer is a quantity, not a name?`, `أي إجابة كمية لا اسم؟`); S('c5.t12.ex', `"How many baskets" has a numerical answer. The other two ask for a category, which is classification.`, `"كم سلة" إجابتها رقم. أما السؤالان الآخران فيطلبان فئة وهذه Classification.`);
S('c5.t13.p', `In the table, which column is the numerical label (the target we want to predict)?`, `في الجدول، أي عمود هو الـ Label العددي (الهدف الذي نريد التنبؤ به)؟`);
S('c5.t13.a', `Wheat harvest`, `Wheat harvest`); S('c5.t13.b', `Sunlight hours`, `Sunlight hours`); S('c5.t13.c', `The field's name`, `اسم الحقل`);
S('c5.t13.h1', `The label is what we are trying to predict.`, `الـ Label هو ما نحاول التنبؤ به.`); S('c5.t13.h2', `The other column is the input we already know.`, `العمود الآخر هو المُدخل الذي نعرفه سلفًا.`); S('c5.t13.ex', `Wheat harvest is the numerical label. Sunlight hours is the feature, the input.`, `Wheat harvest هو الـ Label العددي. أما Sunlight hours فهو الـ Feature أي المُدخل.`);

/* scene 2 */
S('c5.s2.1', `Welcome to the Linekeeper's Tower! We have collected many harvest records.`, `أهلًا بكما في Linekeeper's Tower! جمعنا سجلات حصاد كثيرة.`);
S('c5.s2.2', `The numbers seem to follow a pattern. But how can we describe it with a simple mathematical rule?`, `تبدو الأرقام تتبع نمطًا. لكن كيف نصفه بقاعدة رياضية بسيطة؟`);
S('c5.s2.3', `Maybe we can draw a line through the data?`, `ربما نستطيع رسم خط عبر البيانات؟`);
S('c5.s2.4', `Excellent! **Linear Regression** learns a straight-line relationship between an input feature and a numerical target: y = mx + b.`, `ممتاز! يتعلم **Linear Regression** علاقة خط مستقيم بين Feature مُدخلة وهدف عددي: y = mx + b.`);
S('c5.s2.5', `The line will not necessarily pass through every data point. It tries to represent the overall trend.`, `لن يمر الخط بالضرورة بكل نقطة بيانات. إنه يحاول تمثيل الاتجاه العام.`);
S('c5.s2.6', `**m** is the slope, how much y changes when x grows by 1. **b** is the intercept, the value of y when x is 0.`, `الـ **m** هو الـ Slope أي مقدار تغير y حين يزيد x بمقدار 1. والـ **b** هو الـ Intercept أي قيمة y حين x = 0.`);
S('c5.s2.win', `Wonderful! You have uncovered the Line of Growth.`, `رائع! لقد اكتشفتما Line of Growth.`);
S('c5.s2.win2', `So the line is a model, and the equation helps us make predictions!`, `إذن الخط هو الـ Model والمعادلة تساعدنا على التنبؤ!`);
S('c5.s2.win3', `Exactly. But even a good line can make mistakes. In the next scene, we will learn how to measure them.`, `بالضبط. لكن حتى الخط الجيد قد يخطئ. في المشهد التالي سنتعلم كيف نقيس أخطاءه.`);
S('c5.s2.t1', `Follow me to the Hall of Errors, the building at the top right of the fields.`, `اتبعاني إلى Hall of Errors، المبنى في أعلى يمين الحقول.`);
S('c5.t2.title', `The Line of Growth`, `The Line of Growth`);
S('c5.t21.p', `Using the points (2, 10) and (4, 18), find the slope: m = (18 − 10) ÷ (4 − 2).`, `باستخدام النقطتين (2, 10) و(4, 18) أوجد الـ Slope: m = (18 − 10) ÷ (4 − 2).`);
S('c5.t21.a', `4`, `4`); S('c5.t21.b', `8`, `8`); S('c5.t21.c', `2`, `2`);
S('c5.t21.h1', `Subtract the harvests, then subtract the sunlight hours.`, `اطرح الحصادين ثم اطرح ساعتي الشمس.`); S('c5.t21.h2', `8 ÷ 2.`, `8 ÷ 2.`); S('c5.t21.ex', `(18 − 10) ÷ (4 − 2) = 8 ÷ 2 = 4 baskets per sunlight hour.`, `(18 − 10) ÷ (4 − 2) = 8 ÷ 2 = 4 سلال لكل ساعة شمس.`);
S('c5.t22.p', `The line is y = 4x + b and passes through (2, 10). What is the intercept b?`, `الخط هو y = 4x + b ويمر بالنقطة (2, 10). كم الـ Intercept b؟`);
S('c5.t22.a', `2`, `2`); S('c5.t22.b', `10`, `10`); S('c5.t22.c', `8`, `8`);
S('c5.t22.h1', `Put x = 2 and y = 10 into the equation.`, `ضع x = 2 وy = 10 في المعادلة.`); S('c5.t22.h2', `10 = 4 × 2 + b.`, `10 = 4 × 2 + b.`); S('c5.t22.ex', `10 = 8 + b, so b = 2. The line is y = 4x + 2.`, `10 = 8 + b لذا b = 2. الخط هو y = 4x + 2.`);
S('c5.t23.p', `Use the sliders to place the line through the four harvest points.`, `استخدم المنزلقين لتمرير الخط عبر نقاط الحصاد الأربع.`);
S('c5.t23.h1', `The slope m was 4. The intercept b was 2.`, `كان الـ Slope m يساوي 4 والـ Intercept b يساوي 2.`); S('c5.t23.h2', `Set m = 4 and b = 2.`, `اضبط m = 4 وb = 2.`); S('c5.t23.ex', `With m = 4 and b = 2 the line y = 4x + 2 passes through all four points.`, `مع m = 4 وb = 2 يمر الخط y = 4x + 2 بالنقاط الأربع.`);
S('c5.slope', `Slope m`, `Slope m`); S('c5.inter', `Intercept b`, `Intercept b`); S('c5.eq', `Line: y = {m}x + {b}`, `الخط: y = {m}x + {b}`);
S('c5.t24.p', `Which line matches all four rows of the table?`, `أي خط يطابق الصفوف الأربعة في الجدول؟`);
S('c5.t24.a', `y = 4x + 2`, `y = 4x + 2`); S('c5.t24.b', `y = 2x + 4`, `y = 2x + 4`); S('c5.t24.c', `y = 4x + 10`, `y = 4x + 10`);
S('c5.t24.h1', `Test each line on x = 2 (the harvest is 10).`, `جرّب كل خط عند x = 2 (والحصاد 10).`); S('c5.t24.h2', `4 × 2 + 2 = 10, and it also works for x = 4.`, `4 × 2 + 2 = 10 وهذا يصح أيضًا عند x = 4.`); S('c5.t24.ex', `y = 4x + 2 gives 10, 18, 26 and 34 for x = 2, 4, 6, 8. The others miss.`, `يعطي y = 4x + 2 القيم 10 و18 و26 و34 عند x = 2 و4 و6 و8. أما الآخران فيخطئان.`);

/* scene 3 */
S('c5.s3.1', `A model can make predictions, but how do we know whether those predictions are good?`, `يستطيع الـ Model أن يتنبأ، لكن كيف نعرف إن كانت تنبؤاته جيدة؟`);
S('c5.s3.2', `We need a way to measure the distance between its predictions and the actual results.`, `نحتاج إلى طريقة لقياس المسافة بين تنبؤاته والنتائج الفعلية.`);
S('c5.s3.3', `That difference is called a **prediction error**: actual minus predicted.`, `هذا الفرق يسمى **Prediction Error**: الفعلي ناقص المتوقع.`);
S('c5.s3.4', `**MAE** averages the absolute errors, **MSE** averages the squared errors, and **RMSE** is the square root of MSE.`, `**MAE** هو متوسط الأخطاء المطلقة، و**MSE** متوسط مربعات الأخطاء، و**RMSE** هو الجذر التربيعي للـ MSE.`);
S('c5.s3.win', `Now you understand the Hall of Errors. A prediction is only useful when we can evaluate how close it is to reality.`, `الآن فهمتما Hall of Errors. الـ Prediction لا يفيد إلا إذا قيّمنا قربه من الواقع.`);
S('c5.s3.win2', `So we can compare models by measuring their errors!`, `إذن نستطيع مقارنة الـ Models بقياس أخطائها!`);
S('c5.s3.report', `Wait... there is a page pinned to the wall. This is my handwriting.`, `انتظروا... هناك ورقة مثبّتة على الجدار. هذا خطي.`);
S('c5.s3.report2', `"These models perform perfectly here. I do not know what happens beyond these walls." I wrote that. I handed it to the Core, and the Core filed it away. I warned them. They did not listen.`, `"هذه الـ Models تعمل بشكل مثالي هنا. لا أعرف ماذا يحدث خارج هذه الجدران." أنا كتبت ذلك. سلّمته إلى الـ Core فأرشفه. حذّرتهم. لم يستمعوا.`);
S('c5.s3.report3', `Warnings that are ignored are not failures of the one who warned.`, `التحذيرات التي تُتجاهل ليست فشلًا من الذي حذّر.`);
S('c5.s3.t1', `There is another challenge: a model can be too simple, or it can become too complex. The Temple of Balance, east of the fields, will show you.`, `هناك تحدٍّ آخر: قد يكون الـ Model بسيطًا جدًا أو معقدًا جدًا. سيريكما Temple of Balance شرق الحقول.`);
S('c5.t3.title', `The Hall of Errors`, `The Hall of Errors`);
S('c5.col.f', `Field`, `الحقل`); S('c5.col.act', `Actual`, `Actual`); S('c5.col.pred', `Predicted`, `Predicted`); S('c5.col.err', `Error (actual − predicted)`, `Error (actual − predicted)`);
S('c5.t31.p', `Field B: actual 30, predicted 33. What is the error (actual − predicted), and what does it mean?`, `الحقل B: الفعلي 30 والمتوقع 33. كم الخطأ (الفعلي − المتوقع) وماذا يعني؟`);
S('c5.t31.a', `−3: the prediction was too high (overprediction)`, `−3: كان التوقع أعلى من اللازم (Overprediction)`); S('c5.t31.b', `+3: the prediction was too low`, `+3: كان التوقع أقل من اللازم`); S('c5.t31.c', `0: the prediction was exact`, `0: كان التوقع دقيقًا`);
S('c5.t31.h1', `Subtract: 30 − 33.`, `اطرح: 30 − 33.`); S('c5.t31.h2', `A negative error means the prediction was higher than the actual value.`, `الخطأ السالب يعني أن التوقع كان أعلى من القيمة الفعلية.`); S('c5.t31.ex', `30 − 33 = −3. Negative means the model overpredicted.`, `30 − 33 = −3. السالب يعني أن الـ Model بالغ في التوقع.`);
S('c5.t32.p', `The errors are +2, −3 and +4. MAE = (|2| + |−3| + |4|) ÷ 3. What is the MAE?`, `الأخطاء هي +2 و−3 و+4. MAE = (|2| + |−3| + |4|) ÷ 3. كم الـ MAE؟`);
S('c5.t32.a', `3 baskets`, `3 سلال`); S('c5.t32.b', `1 basket`, `سلة واحدة`); S('c5.t32.c', `9 baskets`, `9 سلال`);
S('c5.t32.h1', `Ignore the signs first: 2, 3 and 4.`, `تجاهل الإشارات أولًا: 2 و3 و4.`); S('c5.t32.h2', `Add them and divide by 3.`, `اجمعها واقسم على 3.`); S('c5.t32.ex', `(2 + 3 + 4) ÷ 3 = 3 baskets. It is in the unit of the target.`, `(2 + 3 + 4) ÷ 3 = 3 سلال. وهي بوحدة الهدف.`);
S('c5.t33.p', `MSE = (2² + (−3)² + 4²) ÷ 3. What is it, about?`, `MSE = (2² + (−3)² + 4²) ÷ 3. كم تساوي تقريبًا؟`);
S('c5.t33.a', `About 9.67`, `حوالي 9.67`); S('c5.t33.b', `About 3`, `حوالي 3`); S('c5.t33.c', `About 29`, `حوالي 29`);
S('c5.t33.h1', `Square each error: 4, 9 and 16.`, `ربّع كل خطأ: 4 و9 و16.`); S('c5.t33.h2', `Add to get 29, then divide by 3.`, `اجمع لتحصل على 29 ثم اقسم على 3.`); S('c5.t33.ex', `(4 + 9 + 16) ÷ 3 = 29 ÷ 3 ≈ 9.67. The unit is baskets squared.`, `(4 + 9 + 16) ÷ 3 = 29 ÷ 3 ≈ 9.67. والوحدة هي السلال تربيع.`);
S('c5.t34.p', `RMSE = √MSE = √(29 ÷ 3). What is it, about?`, `RMSE = √MSE = √(29 ÷ 3). كم تساوي تقريبًا؟`);
S('c5.t34.a', `About 3.11 baskets`, `حوالي 3.11 سلة`); S('c5.t34.b', `About 9.67 baskets`, `حوالي 9.67 سلة`); S('c5.t34.c', `About 4.5 baskets`, `حوالي 4.5 سلة`);
S('c5.t34.h1', `The square root of 9.67.`, `الجذر التربيعي لـ 9.67.`); S('c5.t34.h2', `3² is 9 and 3.1² is about 9.6.`, `3² تساوي 9 و3.1² تساوي حوالي 9.6.`); S('c5.t34.ex', `√9.67 ≈ 3.11 baskets. RMSE returns the error to the original unit.`, `√9.67 ≈ 3.11 سلة. يعيد RMSE الخطأ إلى الوحدة الأصلية.`);
S('c5.t35.p', `Which metric is easiest to read as "the average error, in baskets"?`, `أي مقياس هو الأسهل قراءةً بوصفه "متوسط الخطأ بالسلال"؟`);
S('c5.t35.a', `MAE`, `MAE`); S('c5.t35.b', `MSE, because it squares the errors`, `MSE، لأنه يربّع الأخطاء`); S('c5.t35.c', `A single error`, `خطأ واحد`);
S('c5.t35.h1', `Which one averages the plain absolute errors?`, `أيها يأخذ متوسط الأخطاء المطلقة العادية؟`); S('c5.t35.h2', `MSE is in baskets squared.`, `الـ MSE بوحدة السلال تربيع.`); S('c5.t35.ex', `MAE is the average absolute error in baskets. MSE uses squared units.`, `الـ MAE هو متوسط الخطأ المطلق بالسلال. أما MSE فبوحدات مربعة.`);

/* scene 4 */
S('c5.s4.1', `I use the same simple rule for every field. I never change my prediction much.`, `أستخدم القاعدة البسيطة نفسها لكل حقل. لا أغيّر توقعي كثيرًا.`);
S('c5.s4.2', `I have memorized every field I have ever seen! I can predict the training examples perfectly.`, `لقد حفظت كل حقل رأيته في حياتي! أستطيع التنبؤ بأمثلة التدريب بشكل مثالي.`);
S('c5.s4.3', `Both of you have a problem. A good model must learn the pattern without becoming too simple or too complex.`, `كلاكما لديه مشكلة. يجب أن يتعلم الـ Model الجيد النمط دون أن يصبح بسيطًا جدًا أو معقدًا جدًا.`);
S('c5.s4.4', `This is the **Bias–Variance Tradeoff**. Let us discover what happens when a model is not balanced.`, `هذا هو **Bias–Variance Tradeoff**. لنكتشف ما يحدث حين لا يكون الـ Model متوازنًا.`);
S('c5.s4.win', `A strong model is not the simplest, nor the most complex. It is the one that learns useful patterns and generalizes to new examples.`, `الـ Model القوي ليس الأبسط ولا الأكثر تعقيدًا. إنه الذي يتعلم أنماطًا مفيدة ويعمّم على أمثلة جديدة.`);
S('c5.s4.win2', `We need balance between Bias and Variance!`, `نحتاج إلى توازن بين الـ Bias والـ Variance!`);
S('c5.s4.win3', `Exactly. The Valley of Predictions is nearly restored.`, `بالضبط. Valley of Predictions شبه مستعادة.`);
S('c5.s4.gate', `Listen... the temple gates are swinging open!`, `اسمعوا... بوابات المعبد تنفتح!`);
S('c5.s4.rowan', `The temple's guardian has been wrong in strange ways. White cats are refused entry.`, `حارس المعبد يخطئ بطرق غريبة. القطط البيضاء يُمنع دخولها.`);
S('c5.t4.title', `The Two Sages`, `The Two Sages`);
S('c5.col.tr', `Training error`, `Training error`); S('c5.col.te', `Test error`, `Test error`); S('c5.col.model', `Model`, `Model`);
S('c5.high', `High`, `High`); S('c5.low', `Low`, `Low`); S('c5.vlow', `Very low`, `Very low`);
S('c5.t41.p', `The Simple Sage predicts 20 baskets for every field, while the actual harvests are 10, 20, 30 and 40. Why is the model performing poorly?`, `يتوقع The Simple Sage 20 سلة لكل حقل بينما الحصاد الفعلي 10 و20 و30 و40. لماذا يؤدي الـ Model بشكل سيئ؟`);
S('c5.t41.a', `It is too simple to learn the pattern (underfitting)`, `بسيط جدًا بحيث لا يتعلم النمط (Underfitting)`); S('c5.t41.b', `It memorized the training examples`, `حفظ أمثلة التدريب`); S('c5.t41.c', `It saw too much data`, `رأى بيانات أكثر من اللازم`);
S('c5.t41.h1', `Does its prediction change when the actual harvest changes?`, `هل يتغير توقعه حين يتغير الحصاد الفعلي؟`); S('c5.t41.h2', `A model that ignores the pattern is not memorizing; it is too simple.`, `الـ Model الذي يتجاهل النمط لا يحفظ؛ إنه بسيط جدًا.`); S('c5.t41.ex', `The rule never changes, so it cannot capture the pattern. That is underfitting, commonly linked to high bias.`, `القاعدة لا تتغير فلا تستطيع التقاط النمط. هذا Underfitting ويرتبط عادة بـ High Bias.`);
S('c5.t42.p', `The Complex Sage predicts the training fields perfectly but does badly on new fields. What is the main problem?`, `يتنبأ The Complex Sage بحقول التدريب بشكل مثالي لكنه يؤدي بشكل سيئ على الحقول الجديدة. ما المشكلة الرئيسية؟`);
S('c5.t42.a', `It memorized training-specific details that do not generalize (overfitting)`, `حفظ تفاصيل خاصة بالتدريب لا تُعمَّم (Overfitting)`); S('c5.t42.b', `It is too simple`, `بسيط جدًا`); S('c5.t42.c', `Its test set is too clean`, `Test set عنده نظيفة أكثر من اللازم`);
S('c5.t42.h1', `Compare the score on seen fields and on new fields.`, `قارن الدرجة على الحقول المرئية والحقول الجديدة.`); S('c5.t42.h2', `Perfect on seen examples but poor on new ones is a warning sign.`, `مثالي على الأمثلة المرئية وسيئ على الجديدة علامة تحذير.`); S('c5.t42.ex', `Excellent training performance with poor test performance is weak generalization: overfitting, often linked to high variance.`, `أداء تدريب ممتاز مع أداء اختبار سيئ هو ضعف في التعميم: Overfitting ويرتبط غالبًا بـ High Variance.`);
S('c5.t43.p', `Which model shows good evidence of generalizing?`, `أي Model يُظهر دليلًا جيدًا على التعميم؟`);
S('c5.t43.a', `Model B: low training error, low test error`, `Model B: Training error منخفض وTest error منخفض`); S('c5.t43.b', `Model A: high training error, high test error`, `Model A: Training error مرتفع وTest error مرتفع`); S('c5.t43.c', `Model C: very low training error, high test error`, `Model C: Training error منخفض جدًا وTest error مرتفع`);
S('c5.t43.h1', `Good generalization needs low error on unseen data too.`, `التعميم الجيد يحتاج إلى خطأ منخفض على البيانات غير المرئية أيضًا.`); S('c5.t43.h2', `Model A underfits and Model C overfits.`, `Model A يعاني Underfitting وModel C يعاني Overfitting.`); S('c5.t43.ex', `Model B is low on both. A is high on both (underfitting) and C is low on training but high on test (overfitting).`, `Model B منخفض في الاثنين. أما A فمرتفع في الاثنين (Underfitting) وC منخفض في التدريب مرتفع في الاختبار (Overfitting).`);
S('c5.t44.p', `Tap every true statement.`, `اضغط على كل عبارة صحيحة.`);
S('c5.t44.h1', `Match each problem with bias or variance.`, `طابق كل مشكلة مع Bias أو Variance.`); S('c5.t44.h2', `Underfitting goes with bias, overfitting with variance.`, `الـ Underfitting يرتبط بالـ Bias والـ Overfitting بالـ Variance.`); S('c5.t44.ex', `Underfitting is commonly linked to high bias and overfitting to high variance. Training error alone never proves a model is good.`, `يرتبط Underfitting عادة بـ High Bias وOverfitting بـ High Variance. وTraining error وحده لا يثبت أن الـ Model جيد.`);
S('c5.t44.1', `Underfitting is commonly linked to high bias`, `الـ Underfitting يرتبط عادة بـ High Bias`); S('c5.t44.2', `Overfitting is commonly linked to high variance`, `الـ Overfitting يرتبط عادة بـ High Variance`);
S('c5.t44.3', `Overfitting means the model is too simple`, `الـ Overfitting يعني أن الـ Model بسيط جدًا`); S('c5.t44.4', `Training error alone is enough to judge a model`, `Training error وحده يكفي للحكم على Model`);

/* side quests */
S('c5.sqT.name', `Tumble's price line`, `خط أسعار Tumble`); S('c5.sqT.opt', `Tumble: price fruit by weight`, `Tumble: تسعير الفاكهة بالوزن`);
S('c5.sqT.in', `I want to price my fruit by weight. Here are my sales: 1 kg for 5 coins, 2 kg for 7, 3 kg for 9. Can a line help?`, `أريد تسعير فاكهتي بالوزن. هذه مبيعاتي: 1 kg بـ 5 عملات و2 kg بـ 7 و3 kg بـ 9. هل يساعد خط؟`);
S('c5.sqT.done', `A line to estimate the price of any weight. Marvelous!`, `خط لتقدير سعر أي وزن. رائع!`);
S('c5.sqT.title', `A price line`, `خط أسعار`);
S('c5.sqT.p', `The sales (1, 5), (2, 7), (3, 9) lie on the line y = 2x + 3. What price does the line estimate for 5 kg?`, `المبيعات (1, 5) و(2, 7) و(3, 9) تقع على الخط y = 2x + 3. أي سعر يقدّره الخط لـ 5 kg؟`);
S('c5.sqT.a', `13 coins`, `13 عملة`); S('c5.sqT.b', `11 coins`, `11 عملة`); S('c5.sqT.c', `15 coins`, `15 عملة`);
S('c5.sqT.h1', `Put x = 5 into y = 2x + 3.`, `ضع x = 5 في y = 2x + 3.`); S('c5.sqT.h2', `2 × 5 = 10, then add 3.`, `2 × 5 = 10 ثم أضف 3.`); S('c5.sqT.ex', `y = 2 × 5 + 3 = 13 coins.`, `y = 2 × 5 + 3 = 13 عملة.`);
S('c5.sqR.name', `The rainmaker's ledger`, `دفتر صانع المطر`); S('c5.sqR.opt', `Elder Rowan: over or under?`, `Elder Rowan: بالغ أم قصّر؟`);
S('c5.sqR.in', `The Rainmaker's ledger lists predictions that were too high and too low. Which mistake hurts a farmer more?`, `يسجل دفتر صانع المطر تنبؤات كانت أعلى من اللازم وأخرى أقل. أي خطأ يؤذي المزارع أكثر؟`);
S('c5.sqR.done', `Yes. The cost of a mistake depends on what it makes us do.`, `نعم. كلفة الخطأ تعتمد على ما يدفعنا إلى فعله.`);
S('c5.sqR.title', `Over or under`, `بالغ أم قصّر`);
S('c5.sqR.p', `A farmer plans grain storage using the prediction. Which error is worse?`, `يخطط مزارع لتخزين الحبوب حسب التنبؤ. أي خطأ أسوأ؟`);
S('c5.sqR.a', `It depends on the costs: overpredicting may leave too little grain, underpredicting may waste a little`, `يعتمد على الكلفة: المبالغة قد تترك حبوبًا قليلة جدًا، والتقصير قد يهدر القليل`); S('c5.sqR.b', `Overpredicting is always worse`, `المبالغة أسوأ دائمًا`); S('c5.sqR.c', `Underpredicting is always worse`, `التقصير أسوأ دائمًا`);
S('c5.sqR.h1', `Think about what the farmer does with the number.`, `فكّر ماذا يفعل المزارع بالرقم.`); S('c5.sqR.h2', `Different mistakes have different costs.`, `الأخطاء المختلفة لها كلفات مختلفة.`); S('c5.sqR.ex', `Which error is worse depends on the cost of each mistake in the real situation. Metrics should match the goal.`, `أي خطأ أسوأ يعتمد على كلفة كل خطأ في الموقف الحقيقي. يجب أن تناسب المقاييس الهدف.`);
S('c5.sqW.name', `The wiggly fence`, `السياج المتعرج`); S('c5.sqW.opt', `Professor Lin: the wiggly fence`, `Professor Lin: السياج المتعرج`);
S('c5.sqW.in', `A fence follows every point exactly, and fails on the next point. Slide its flexibility until it just fits.`, `سياج يتبع كل نقطة بدقة ثم يفشل عند النقطة التالية. حرّك مرونته حتى يناسب تمامًا.`);
S('c5.sqW.done', `Not too stiff, not too wiggly. That is balance.`, `ليس جامدًا ولا متعرجًا. هذا هو التوازن.`);
S('c5.sqW.title', `Too simple, too wiggly`, `بسيط جدًا، متعرج جدًا`);
S('c5.sqW.p', `Slide the flexibility. Choose the level with the lowest test error.`, `حرّك المرونة. اختر المستوى الذي له أقل Test error.`);
S('c5.sqW.h1', `Compare the test errors, not the training errors.`, `قارن Test errors لا Training errors.`); S('c5.sqW.h2', `The test error is lowest at level 2.`, `Test error أقل ما يكون عند المستوى 2.`); S('c5.sqW.ex', `Level 2 has the lowest test error (2.5). Higher levels fit the training points better but do worse on new ones.`, `المستوى 2 له أقل Test error (2.5). المستويات الأعلى تناسب نقاط التدريب أكثر لكنها أسوأ على الجديدة.`);
S('c5.flex', `Flexibility: {n}`, `Flexibility: {n}`); S('c5.flex.tr', `Training error: {v}`, `Training error: {v}`); S('c5.flex.te', `Test error: {v}`, `Test error: {v}`);
S('c5.flex.1', `very stiff`, `جامد جدًا`); S('c5.flex.3', `balanced`, `متوازن`); S('c5.flex.5', `very wiggly`, `متعرج جدًا`);

/* boss: Rote */
S('c5.b.1', `My learner knows every brown cat it has ever seen!`, `الـ Learner الذي أملكه يعرف كل قطة بنية رآها في حياته!`);
S('c5.b.2', `But it cannot recognize this white cat.`, `لكنه لا يستطيع التعرف على هذه القطة البيضاء.`);
S('c5.b.3', `It has never memorized one like that.`, `لم يحفظ واحدة مثلها قط.`);
S('c5.b.4', `A learner must find patterns that work beyond its training examples.`, `يجب أن يجد الـ Learner أنماطًا تعمل خارج أمثلة تدريبه.`);
S('c5.b.5', `The white cat belongs here too!`, `القطة البيضاء تنتمي إلى هنا أيضًا!`);
S('c5.b.start', `Rote, the Overfitter`, `Rote, the Overfitter`);
S('c5.bw.1', `I only kept what I had seen. I never asked what I had not.`, `احتفظت فقط بما رأيته. ولم أسأل يومًا عما لم أره.`);
S('c5.bw.2', `Strong training performance alone does not prove generalization.`, `الأداء القوي في التدريب وحده لا يثبت التعميم.`);
S('c5.crote.win', `I keep a place for the unseen now. The white cat sleeps by my side.`, `أحتفظ الآن بمكان لغير المرئي. القطة البيضاء تنام بجانبي.`);
S('c5.frag', `Core Fragment 5 of 6 obtained.`, `تم الحصول على Core Fragment 5 من 6.`);
S('c5.mem', `There is one more thing in the report. A map. The last pages point out to the sea, to a place the Core called its final test.`, `هناك شيء آخر في التقرير. خريطة. الصفحات الأخيرة تشير نحو البحر، إلى مكان سماه الـ Core اختباره النهائي.`);
S('c5.br.1', `A model that is balanced can still be wrong about things it has not met. What does it do with creatures that have no labels at all?`, `الـ Model المتوازن قد يخطئ مع أشياء لم يقابلها. فماذا يفعل مع مخلوقات بلا Labels إطلاقًا؟`);
S('c5.br.2', `Then we need to learn without answers.`, `إذن علينا أن نتعلم بلا إجابات.`);
S('c5.br.3', `Then we sail. A ferry waits at the river mouth with a lantern on its bow.`, `إذن نبحر. عبّارة تنتظر عند مصب النهر وعلى مقدمتها فانوس.`);
S('b5.ph1', `Phase 1: Familiarity Trap`, `المرحلة 1: Familiarity Trap`); S('b5.ph2', `Phase 2: Memorized Match`, `المرحلة 2: Memorized Match`); S('b5.ph3', `Phase 3: Diverse Evidence`, `المرحلة 3: Diverse Evidence`); S('b5.ph4', `Phase 4: Generalization Trial`, `المرحلة 4: Generalization Trial`);
S('b5.taunt', `Rote's stone eyes glint. Familiar things always look right to him. Try again.`, `تلمع عينا Rote الحجريتان. الأشياء المألوفة تبدو له صحيحة دائمًا. حاول مرة أخرى.`);
S('b5.vict', `Rote has been convinced! The gate will now welcome cats of every color.`, `تم إقناع Rote! ستستقبل البوابة الآن قططًا بكل الألوان.`);
S('b5.rCodex', `Codex: Overfitting`, `Codex: Overfitting`);
S('mst.balance', `Balance`, `Balance`);
Q('q5.1', [`The training set has 20 photos, all of brown cats. A white cat arrives and the learner rejects it. What is the most likely reason?`, `مجموعة التدريب فيها 20 صورة كلها لقطط بنية. تصل قطة بيضاء فيرفضها الـ Learner. ما السبب الأرجح؟`],
  [`The training examples had very little variety, so it learned "brown" instead of what makes a cat`, `أمثلة التدريب قليلة التنوع، فتعلم "بني" بدل ما يجعل الحيوان قطة`], [`White cats are not cats`, `القطط البيضاء ليست قططًا`], [`The photo was too bright`, `الصورة ساطعة جدًا`],
  [`Look at what every training example has in common.`, `انظر إلى ما تشترك فيه كل أمثلة التدريب.`], [`The learner can only learn from what it has seen.`, `يستطيع الـ Learner أن يتعلم فقط مما رآه.`],
  [`All the examples were brown cats, so color became the pattern. Narrow variation leads to narrow learning.`, `كل الأمثلة قطط بنية فصار اللون هو النمط. التنوع الضيق يؤدي إلى تعلم ضيق.`]);
Q('q5.2', [`Rote's learner scores 100% on its training photos. What can we conclude?`, `يحصل الـ Learner عند Rote على 100% في صور تدريبه. ماذا نستنتج؟`],
  [`Only that it handles those familiar photos; we still need to test on unseen ones`, `فقط أنه يتعامل مع تلك الصور المألوفة؛ ما زلنا بحاجة إلى اختباره على صور غير مرئية`], [`That it will work on every new cat`, `أنه سيعمل مع كل قطة جديدة`], [`That the learner is perfect`, `أن الـ Learner مثالي`],
  [`Were any of those photos new to the learner?`, `هل كانت أي من تلك الصور جديدة على الـ Learner؟`], [`A score on seen examples says little about unseen ones.`, `الدرجة على أمثلة مرئية لا تقول الكثير عن أمثلة غير مرئية.`],
  [`A perfect training score may just mean memorization. Generalization is shown on unseen examples.`, `قد تعني الدرجة التدريبية المثالية الحفظ فقط. يظهر التعميم على أمثلة غير مرئية.`]);
H('q5.3', [`Tap every sign that a learner may be memorizing instead of learning.`, `اضغط على كل علامة تدل على أن الـ Learner يحفظ بدل أن يتعلم.`],
  [`Compare how it does on seen and on new examples.`, `قارن أداءه على الأمثلة المرئية والجديدة.`], [`Two of the four are warning signs.`, `اثنتان من الأربع علامتا تحذير.`],
  [`Excellent scores on training photos, much worse scores on new photos, and rejecting a white cat that has all the cat features are signs of memorizing.`, `الدرجات الممتازة على صور التدريب والأسوأ بكثير على الصور الجديدة ورفض قطة بيضاء لها كل ملامح القطط هي علامات حفظ.`]);
S('q5.3.1', `Excellent scores on training photos`, `درجات ممتازة على صور التدريب`); S('q5.3.2', `Much worse scores on new photos`, `درجات أسوأ بكثير على الصور الجديدة`); S('q5.3.3', `The same score on new and old photos`, `الدرجة نفسها على الصور الجديدة والقديمة`); S('q5.3.4', `Rejecting a white cat that has ears, whiskers and a tail`, `رفض قطة بيضاء لها أذنان وشوارب وذيل`);
Q('q5.4', [`A test photo is an exact copy of a training photo, and the learner gets it right. What does that show?`, `صورة اختبار هي نسخة مطابقة لصورة تدريب والـ Learner يصيب فيها. ماذا يُظهر ذلك؟`],
  [`Only familiarity; it says nothing about new cats`, `الألفة فقط؛ ولا يقول شيئًا عن القطط الجديدة`], [`That the learner generalizes`, `أن الـ Learner يعمّم`], [`That the white cat is solved too`, `أن القطة البيضاء حُلّت أيضًا`],
  [`Has the learner ever seen this exact photo?`, `هل رأى الـ Learner هذه الصورة بعينها من قبل؟`], [`Remember data leakage from the Model Workshop.`, `تذكّر Data Leakage من Model Workshop.`],
  [`A copy of a training example rewards memorization. It is leakage, not evidence of generalization.`, `نسخة من مثال تدريب تكافئ الحفظ. هذا تسرّب وليس دليلًا على التعميم.`]);
Q('q5.5', [`Rote's rule is: "if the photo matches a training photo exactly, give its label". What happens with a new white cat?`, `قاعدة Rote: "إن طابقت الصورة صورة تدريب تمامًا فأعطِ تسميتها". ماذا يحدث مع قطة بيضاء جديدة؟`],
  [`There is no exact match, so the rule has nothing to say: it did not learn a pattern`, `لا توجد مطابقة تامة فلا تقول القاعدة شيئًا: لم تتعلم نمطًا`], [`It labels it a cat correctly`, `تسميها قطة بشكل صحيح`], [`It copies the nearest brown cat's color`, `تنسخ لون أقرب قطة بنية`],
  [`Is a new photo ever an exact copy of an old one?`, `هل الصورة الجديدة نسخة مطابقة لقديمة؟`], [`A rule that needs exact matches cannot handle new cases.`, `القاعدة التي تحتاج إلى مطابقة تامة لا تتعامل مع الحالات الجديدة.`],
  [`Exact matching is memorization. Real learning finds features, like ears and whiskers, that carry over to new examples.`, `المطابقة التامة حفظ. التعلم الحقيقي يجد Features مثل الأذنين والشوارب تنتقل إلى الأمثلة الجديدة.`]);
Q('q5.6', [`Which evidence would best convince you that the learner generalizes?`, `أي دليل يقنعك أكثر بأن الـ Learner يعمّم؟`],
  [`Good results on a held-out test set of cats it has never seen`, `نتائج جيدة على Test set محجوزة من قطط لم يرها قط`], [`A perfect score on its own training photos`, `درجة مثالية على صور تدريبه نفسها`], [`Rote saying so`, `قول Rote ذلك`],
  [`Evidence must come from data the learner did not train on.`, `يجب أن يأتي الدليل من بيانات لم يتدرب عليها الـ Learner.`], [`Remember the sealed Test chamber.`, `تذكّر غرفة الـ Test المغلقة.`],
  [`A held-out test set of unseen examples shows how well the learner works beyond its training photos.`, `الـ Test set المحجوزة من أمثلة غير مرئية تُظهر مدى عمل الـ Learner خارج صور تدريبه.`]);
S('q5.7.p', `The harvest curve has many fields. Slide the flexibility and find the level with the lowest test error.`, `منحنى الحصاد فيه حقول كثيرة. حرّك المرونة وأوجد المستوى الذي له أقل Test error.`);
S('q5.7.h1', `Look at the test error, not the training error.`, `انظر إلى Test error لا Training error.`); S('q5.7.h2', `The test error is lowest at level 3.`, `Test error أقل ما يكون عند المستوى 3.`); S('q5.7.ex', `Level 3 has the lowest test error (2.0). Level 5 has zero training error but the worst test error: overfitting.`, `المستوى 3 له أقل Test error (2.0). المستوى 5 له Training error صفر لكن أسوأ Test error: Overfitting.`);
Q('q5.8', [`Adding varied examples (different fields, colors and weather) helps because...`, `إضافة أمثلة متنوعة (حقول وألوان وطقس مختلفة) تساعد لأن...`],
  [`The learner can no longer rely on accidental details of a few examples`, `الـ Learner لم يعد يستطيع الاعتماد على تفاصيل عرضية في أمثلة قليلة`], [`More photos always make the training score lower`, `المزيد من الصور يخفض دائمًا درجة التدريب`], [`It removes the need for a test set`, `يلغي الحاجة إلى Test set`],
  [`What happens when each kind of example appears more than once?`, `ماذا يحدث حين يظهر كل نوع من الأمثلة أكثر من مرة؟`], [`Variety makes accidental patterns less useful.`, `التنوع يجعل الأنماط العرضية أقل فائدة.`],
  [`Diverse examples make accidental patterns, like "brown", stop working, so the learner finds features that matter. A test set is still needed.`, `الأمثلة المتنوعة تجعل الأنماط العرضية مثل "بني" لا تنجح فيجد الـ Learner Features المهمة. ولا نزال بحاجة إلى Test set.`]);
Q('q5.9', [`Rote's model has a very low training error (0.1) and a high test error (9). Model B has training 2 and test 3. Which has a better chance on new fields?`, `الـ Model عند Rote له Training error منخفض جدًا (0.1) وTest error مرتفع (9). وModel B له تدريب 2 واختبار 3. أيهما أفضل حظًا مع الحقول الجديدة؟`],
  [`Model B, because its test error is much lower`, `Model B، لأن Test error عنده أقل بكثير`], [`Rote's model, because its training error is lower`, `Model Rote، لأن Training error عنده أقل`], [`They are equal`, `متساويان`],
  [`Which number tells you about new fields?`, `أي رقم يخبرك عن الحقول الجديدة؟`], [`Compare the test errors: 9 and 3.`, `قارن Test errors: 9 و3.`],
  [`Test error estimates performance on unseen data. Model B's 3 beats 9. Rote's model overfits.`, `يقدّر Test error الأداء على بيانات غير مرئية. الـ 3 عند Model B أفضل من 9. Model Rote يعاني Overfitting.`]);
Q('q5.10', [`Rote's overfitting model changes a lot if you retrain it on slightly different fields. Which word describes that?`, `Model Rote المعاني من Overfitting يتغير كثيرًا إذا أعدت تدريبه على حقول مختلفة قليلًا. أي كلمة تصف ذلك؟`],
  [`High variance`, `High variance`], [`High bias`, `High bias`], [`Perfect generalization`, `Perfect generalization`],
  [`Variance means sensitivity to the particular training sample.`, `الـ Variance يعني الحساسية لعيّنة التدريب المحددة.`], [`Underfitting goes with bias; overfitting goes with variance.`, `الـ Underfitting يرتبط بالـ Bias والـ Overfitting بالـ Variance.`],
  [`High variance: the fitted model depends strongly on the particular training data. It is commonly linked to overfitting, but these are common patterns, not universal laws.`, `High variance: يعتمد الـ Model المُدرَّب بقوة على بيانات التدريب المحددة. يرتبط عادة بـ Overfitting، لكنها أنماط شائعة لا قوانين عامة.`]);
S('end5.title', `Valley of Predictions restored`, `تمت استعادة Valley of Predictions`);
S('end5.body', `You predicted numbers, fitted a line, measured errors and found the balance between too simple and too wiggly.`, `تنبأتما بالأرقام، وضبطتما خطًا، وقسمتما الأخطاء، ووجدتما التوازن بين البسيط جدًا والمتعرج جدًا.`);
S('end5.cliff', `A ferry waits at the river mouth. The last chapter begins.`, `عبّارة تنتظر عند مصب النهر. يبدأ الفصل الأخير.`);
S('end5.frag', `Core Fragment 5 of 6`, `Core Fragment 5 من 6`); S('end5.concept', `Balance skill`, `مهارة التوازن`); S('chapter.end5', `Chapter 5 complete`, `اكتمل الفصل 5`);
S('j5.1', `The Harvest of Numbers`, `The Harvest of Numbers`); S('j5.2', `The Line of Growth`, `The Line of Growth`); S('j5.3', `The Hall of Errors`, `The Hall of Errors`); S('j5.4', `The Two Sages`, `The Two Sages`); S('j5.5', `Face Rote at the Temple of Balance`, `واجه Rote عند Temple of Balance`); S('j5.6', `Leave the valley`, `غادر الوادي`);
CODEX.push('regress', 'linear', 'errors', 'fitting', 'biasvar', 'priceline', 'wiggle');
S('cx.regress.term', `Regression`, `Regression`); S('cx.regress.body', `A supervised task that predicts a numerical value, like baskets of wheat. Classification predicts a category instead.`, `مهمة Supervised تتنبأ بقيمة عددية مثل سلال القمح. أما Classification فتتنبأ بفئة.`);
S('cx.linear.term', `Linear regression`, `Linear regression`); S('cx.linear.body', `A model that fits a straight line y = mx + b. The slope m is the change in y per 1 in x; the intercept b is y when x is 0.`, `Model يضبط خطًا مستقيمًا y = mx + b. الـ Slope m هو تغير y لكل 1 في x والـ Intercept b هو y عند x = 0.`);
S('cx.errors.term', `MAE, MSE and RMSE`, `MAE و MSE و RMSE`); S('cx.errors.body', `Prediction error = actual − predicted. MAE averages absolute errors; MSE averages squared errors; RMSE is the square root of MSE and has the target's unit.`, `Prediction Error = الفعلي − المتوقع. الـ MAE متوسط الأخطاء المطلقة، والـ MSE متوسط مربعات الأخطاء، والـ RMSE هو جذر MSE وله وحدة الهدف.`);
S('cx.fitting.term', `Underfitting and overfitting`, `Underfitting و Overfitting`); S('cx.fitting.body', `Underfitting: too simple to learn the pattern. Overfitting: memorizing training details that do not generalize. Compare training and test error.`, `Underfitting: بسيط جدًا لتعلم النمط. Overfitting: حفظ تفاصيل تدريب لا تُعمَّم. قارن Training error وTest error.`);
S('cx.biasvar.term', `Bias–variance tradeoff`, `Bias–variance tradeoff`); S('cx.biasvar.body', `High bias is commonly linked to underfitting; high variance to overfitting. A balanced model generalizes to new data. These are common patterns, not universal laws.`, `High bias يرتبط عادة بـ Underfitting وHigh variance بـ Overfitting. الـ Model المتوازن يعمّم على بيانات جديدة. هذه أنماط شائعة لا قوانين عامة.`);
S('cx.priceline.term', `Using a line to estimate`, `استخدام خط للتقدير`); S('cx.priceline.body', `Once a line fits the data, plug in a new x to estimate y.`, `بعد أن يناسب الخط البيانات ضع x جديدة لتقدير y.`);
S('cx.wiggle.term', `Too simple, too wiggly`, `بسيط جدًا، متعرج جدًا`); S('cx.wiggle.body', `Too little flexibility underfits; too much follows noise and overfits. Choose the level with the lowest test error.`, `مرونة قليلة جدًا تسبب Underfitting ومرونة كثيرة جدًا تتبع الضوضاء وتسبب Overfitting. اختر المستوى الأقل في Test error.`);
