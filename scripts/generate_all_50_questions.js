const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'customQuestionsDb.json');

const GRADES = ['nursery', 'class-1', 'class-2', 'class-3', 'class-4-5'];
const SUBJECTS = ['science', 'gk', 'maths', 'english', 'hindi'];

// Helper to shuffle options and ensure correct answer is included
function makeQ(id, grade, subject, qEng, qHin, visual, correct, wrong1, wrong2, wrong3, expEng, expHin) {
  const opts = [correct, wrong1, wrong2, wrong3];
  // Deterministic or pseudo-random shuffle so answer isn't always at index 0
  const shuffled = [...opts].sort(() => 0.5 - Math.random());
  return {
    id,
    grade,
    subject,
    questionEnglish: qEng,
    questionHindi: qHin,
    visual,
    options: shuffled,
    correctAnswer: correct,
    explanationEnglish: expEng || `Correct! The answer is ${correct}.`,
    explanationHindi: expHin || `शाबाश! सही उत्तर है: ${correct}।`,
    source: 'Curriculum Master Bank',
    createdAt: Date.now(),
  };
}

// Build 50 questions for each track
const allQuestions = [];

// ==========================================
// 1. NURSERY (Age 3-4)
// ==========================================

// Nursery Science (50 Questions)
const nurseryScienceData = [
  ["Which of these is a living animal?", "इनमें से कौन सा एक जीवित जानवर है?", "🐶", "Dog 🐶", "Toy Car 🚗", "Stone 🪨", "Plastic Ball ⚽", "Dogs breathe, eat and grow!"],
  ["What do we use to see colors around us?", "हम अपने चारों ओर रंग देखने के लिए किसका उपयोग करते हैं?", "👀", "Eyes 👀", "Ears 👂", "Nose 👃", "Teeth 🦷", "We see with our two eyes!"],
  ["Which sense organ helps us hear songs and bells?", "गाने और घंटी सुनने में कौन सा अंग मदद करता है?", "👂", "Ears 👂", "Eyes 👀", "Tongue 👅", "Hands 🖐️", "Our ears hear lovely sounds."],
  ["What helps us smell lovely flowers?", "प्यारे फूलों की खुशबू सूंघने में क्या मदद करता है?", "👃", "Nose 👃", "Knee 🦵", "Elbow 💪", "Toes 🦶", "We smell fragrance through our nose."],
  ["Which body part helps us taste sweet ice-cream?", "मीठी आइसक्रीम का स्वाद चखने में कौन सा अंग मदद करता है?", "👅", "Tongue 👅", "Fingers 🖐️", "Hair 💇", "Nose 👃", "Our tongue tastes sweet, sour and salty foods."],
  ["What sound does a cute cow make?", "गाय कौन सी आवाज निकालती है?", "🐄", "Moo Moo 🐄", "Bark Bark 🐕", "Quack Quack 🦆", "Meow Meow 🐱", "A cow says Moo!"],
  ["What sound does a friendly dog make?", "कुत्ता कौन सी आवाज निकालता है?", "🐕", "Woof Woof 🐕", "Roar 🦁", "Moo 🐄", "Oink 🐷", "A dog barks Woof Woof!"],
  ["What sound does a sweet cat make?", "बिल्ली कौन सी आवाज निकालती है?", "🐱", "Meow Meow 🐱", "Quack 🦆", "Chirp 🐦", "Ribbit 🐸", "A cat says Meow!"],
  ["Where does a bird build its cozy home?", "पक्षी अपना घोंसला कहाँ बनाता है?", "🐦", "Nest 🪺", "Water 🌊", "Cave 🪨", "Shed 🛖", "Birds build soft nests in trees."],
  ["Where does a fish live and swim?", "मछली कहाँ रहती और तैरती है?", "🐟", "Water 💧", "Tree 🌳", "Sky ☁️", "Sand 🏜️", "Fish breathe and swim in water."],
  ["What color is fresh green grass?", "हरी घास का रंग कैसा होता है?", "🌱", "Green 🟢", "Pink 🌸", "Purple 🟣", "Black ⚫", "Grass is lush green."],
  ["What shines brightly in the sky during the day?", "दिन के समय आकाश में क्या चमकता है?", "☀️", "Sun ☀️", "Moon 🌙", "Stars ⭐", "Dark Cloud ☁️", "The bright Sun gives us day light."],
  ["What do plants need to grow big and healthy?", "पौधों को बड़ा होने के लिए क्या चाहिए?", "🌱", "Water & Sunlight 💧☀️", "Juice & Pizza 🍕", "Candies 🍬", "Pencil ✏️", "Plants need water, air and sun light."],
  ["What color is a red rose?", "लाल गुलाब का रंग क्या होता है?", "🌹", "Red 🔴", "Blue 🔵", "Yellow 🟡", "White ⚪", "Roses are lovely red."],
  ["What animal gives us healthy milk to drink?", "हमें पीने के लिए पौष्टिक दूध कौन सा जानवर देता है?", "🥛", "Cow 🐄", "Lion 🦁", "Eagle 🦅", "Tiger 🐅", "Cow and buffalo give us milk."],
  ["Which bird has colorful green feathers and a red beak?", "हरे पंखों और लाल चोंच वाला पक्षी कौन सा है?", "🦜", "Parrot 🦜", "Crow 🐦", "Pigeon 🕊️", "Owl 🦉", "A parrot has green feathers and loves green chillies."],
  ["What drops from the clouds on a rainy day?", "बारिश के दिन बादलों से क्या गिरता है?", "🌧️", "Raindrops 💧", "Chocolates 🍫", "Books 📚", "Coins 🪙", "Raindrops fall from the gray clouds."],
  ["What appears in the sky after the rain with 7 colors?", "बारिश के बाद आकाश में सात रंगों वाला क्या दिखता है?", "🌈", "Rainbow 🌈", "Rocket 🚀", "Airplane ✈️", "Balloon 🎈", "A rainbow has seven beautiful colors."],
  ["What animal is known as the King of the Jungle?", "जंगल का राजा किस जानवर को कहा जाता है?", "🦁", "Lion 🦁", "Monkey 🐒", "Deer 🦌", "Rabbit 🐰", "The brave lion is the King of the Jungle."],
  ["Which animal loves to hop and eat carrots?", "कौन सा जानवर कूदता है और गाजर खाता है?", "🐰", "Rabbit 🐰", "Bear 🐻", "Camel 🐫", "Crocodile 🐊", "Rabbits have long ears and love carrots."],
  ["Which animal swings from tree branches?", "पेड़ की डालियों पर कौन सा जानवर झूलता है?", "🐒", "Monkey 🐒", "Tortoise 🐢", "Fish 🐠", "Duck 🦆", "Monkeys love jumping from branch to branch."],
  ["Which is the biggest land animal with a long trunk?", "लंबी सूंड वाला सबसे बड़ा स्थलीय जानवर कौन सा है?", "🐘", "Elephant 🐘", "Dog 🐕", "Cat 🐈", "Goat 🐐", "An elephant has a long trunk and big ears."],
  ["What comes out in the night sky?", "रात के आकाश में क्या दिखाई देता है?", "🌙", "Moon & Stars 🌙⭐", "Hot Sun ☀️", "Rainbow 🌈", "Blue Sky 🌤️", "The moon and stars glow at night."],
  ["Which part of a plant is hidden under the ground?", "पौधे का कौन सा भाग जमीन के नीचे छिपा होता है?", "🌿", "Roots 🌱", "Flowers 🌸", "Leaves 🍃", "Fruit 🍎", "Roots grow underground to drink water."],
  ["What do we open over our head when it rains?", "बारिश होने पर हम सिर पर क्या खोलते हैं?", "☂️", "Umbrella ☂️", "Book 📖", "Box 📦", "Plate 🍽️", "An umbrella keeps us dry in rain."],
  ["Which insect makes sweet honey?", "मीठा शहद कौन सा कीट बनाता है?", "🍯", "Honeybee 🐝", "Spider 🕷️", "Ant 🐜", "Fly 🪰", "Honeybees collect nectar and make honey."],
  ["What do ducklings say in the pond?", "बतख के बच्चे तालाब में क्या कहते हैं?", "🦆", "Quack Quack 🦆", "Chirp Chirp 🐦", "Roar 🦁", "Hiss 🐍", "Ducks say Quack Quack."],
  ["Which animal carries a hard shell on its back?", "अपनी पीठ पर कठोर खोल कौन सा जानवर रखता है?", "🐢", "Tortoise 🐢", "Dog 🐶", "Frog 🐸", "Squirrel 🐿️", "A tortoise hides inside its hard shell."],
  ["What do our feet help us do?", "हमारे पैर हमें क्या करने में मदद करते हैं?", "🦶", "Walk & Run 🏃", "Smell 👃", "Chew 👄", "Hear 👂", "Our feet help us jump, walk and run."],
  ["What do we use our hands for?", "हम अपने हाथों का उपयोग किसके लिए करते हैं?", "🖐️", "Clap & Draw 👏🎨", "Breathe 🫁", "Taste 👅", "Blink 👀", "We use hands to write, clap and hug."],
  ["Which animal swims in water and has fins?", "पानी में पंखों के साथ कौन सा जीव तैरता है?", "🐠", "Fish 🐠", "Rabbit 🐰", "Cat 🐱", "Cow 🐄", "Fish have fins to swim smoothly."],
  ["What color is milk?", "दूध का रंग क्या होता है?", "🥛", "White 🥛", "Blue 🔵", "Red 🔴", "Green 🟢", "Fresh healthy milk is white."],
  ["Which animal has black and white stripes like a zebra crossing?", "काली और सफेद धारियों वाला जानवर कौन सा है?", "🦓", "Zebra 🦓", "Horse 🐎", "Giraffe 🦒", "Donkey 🫏", "A zebra has black and white stripes."],
  ["Which tall animal has a very long neck to eat tree leaves?", "किस ऊंचे जानवर की गर्दन बहुत लंबी होती है?", "🦒", "Giraffe 🦒", "Panda 🐼", "Goat 🐐", "Fox 🦊", "Giraffes are the tallest animals."],
  ["What shines in the sky with five points like a diamond?", "हीरे की तरह चमकने वाले पाँच कोनों वाले क्या होते हैं?", "⭐", "Stars ⭐", "Moon 🌙", "Cloud ☁️", "Airplane ✈️", "Twinkle twinkle little star."],
  ["Which vegetable is long, orange, and liked by bunnies?", "लंबी, नारंगी सब्जी जो खरगोश को पसंद है, कौन सी है?", "🥕", "Carrot 🥕", "Potato 🥔", "Onion 🧅", "Tomato 🍅", "Carrots are crunchy and orange."],
  ["Which fruit is round and red, kept doctor away?", "गोल और लाल फल जो डॉक्टर को दूर रखता है, कौन सा है?", "🍎", "Apple 🍎", "Lemon 🍋", "Banana 🍌", "Pineapple 🍍", "An apple a day keeps doctor away!"],
  ["What gives us heat, warmth and light in the morning?", "सुबह हमें गर्मी और रोशनी कौन देता है?", "☀️", "Sun ☀️", "Snowman ⛄", "Fan 🪭", "Fridge 🧊", "The Sun gives us warmth and light."],
  ["Which bird stays awake during the night with big round eyes?", "बड़ी गोल आँखों वाला कौन सा पक्षी रात में जागता है?", "🦉", "Owl 🦉", "Duck 🦆", "Hen 🐔", "Sparrow 🐦", "An owl can see clearly in the dark."],
  ["What grows on trees and turns yellow or red in autumn?", "पेड़ों पर क्या उगता है जो पतझड़ में पीला या लाल हो जाता है?", "🍃", "Leaves 🍃", "Stones 🪨", "Candles 🕯️", "Wheels 🛞", "Leaves make food for the green tree."],
  ["What season needs us to wear warm woolen caps and jackets?", "किस मौसम में ऊनी टोपी और जैकेट पहननी पड़ती है?", "❄️", "Winter ❄️", "Summer ☀️", "Rainy 🌧️", "Spring 🌸", "Winter is cold, so we wear woolens."],
  ["Which domestic animal gives us soft warm wool?", "हमें मुलायम ऊन कौन सा घरेलू जानवर देता है?", "🐑", "Sheep 🐑", "Lion 🦁", "Duck 🦆", "Crow 🐦", "Sheep gives us wool for sweaters."],
  ["What do little chicks hatch out of?", "छोटे चूजे किसमें से बाहर निकलते हैं?", "🥚", "Egg 🥚", "Bottle 🍼", "Box 📦", "Seed 🌱", "Chicks hatch from warm eggs."],
  ["Which animal loves to eat yellow bananas?", "पीला केला खाना किस जानवर को पसंद है?", "🐒", "Monkey 🐒", "Cat 🐱", "Dog 🐕", "Eagle 🦅", "Monkeys love peeling sweet bananas."],
  ["What do we drink when we are very thirsty?", "बहुत प्यास लगने पर हम क्या पीते हैं?", "💧", "Water 💧", "Paint 🎨", "Oil 🛢️", "Sand 🏖️", "Clean water quenches our thirst."],
  ["Which tiny insect carries food crumbs in a long line?", "कौन सा छोटा कीट एक कतार में भोजन ले जाता है?", "🐜", "Ant 🐜", "Elephant 🐘", "Bear 🐻", "Wolf 🐺", "Hardworking ants walk in sweet lines."],
  ["What shape is the full moon in the night sky?", "रात के आकाश में पूर्णिमा का चाँद किस आकार का होता है?", "🌕", "Circle ⚪", "Square ⏹️", "Triangle 🔺", "Star ⭐", "A full moon is round like a circle."],
  ["Which sea animal has eight long arms?", "किस समुद्री जीव की आठ लंबी भुजाएँ होती हैं?", "🐙", "Octopus 🐙", "Shark 🦈", "Crab 🦀", "Seahorse 🐡", "An octopus has eight wiggly arms."],
  ["What do flowers have that bees love to smell?", "फूलों में ऐसा क्या होता है जो मधुमक्खियों को पसंद है?", "🌸", "Sweet Nectar 🍯", "Ice 🧊", "Soap 🧼", "Mud 🟫", "Flowers have sweet fragrant nectar."],
  ["What color is the bright lemon?", "चमकदार नींबू का रंग क्या होता है?", "🍋", "Yellow 🟡", "Blue 🔵", "Black ⚫", "Purple 🟣", "Lemons are bright and yellow."]
];

console.log('Nursery science ready:', nurseryScienceData.length);
