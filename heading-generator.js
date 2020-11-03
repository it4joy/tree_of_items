// 100 most used English words (N: expand to 1000)
// src: https://16000words.com/

const frequencyDictionary = 'the, be, of, and, a, in, to, have, it, for, I, that, you, he, on, with, do, at, by, not, this, but, from, they, his, she, n\'t, or, which, as, we, an, say, will, would, can, if, their, go, what, there, all, get, her, make, who, out, up, see, know, time, take, them, some, could, so, him, year, into, its, then, think, my, come, than, more, about, now, last, your, me, no, other, give, just, should, these, people, two, also, well, any, only, new, very, when, May, may, way, look, like, use, such, how, because, good, find, man, our, want';

const generateHeading = () => {

  // P: think about rename 'freqDict' to 'freqDictArray' (namespaces of a task / solution)
  const freqDict = frequencyDictionary.split(', ');
  //console.log(freqDict);
  //console.log(freqDict.length);

  const randomIntArr = [];

  const getRandomInt = (min, max, repeat) => {
    // think about optimization
    for (let i = 0; i < repeat; i++) {
      const randomInt = Math.floor( Math.random() * (max - min) ) + min;
      randomIntArr.push(randomInt);
    }

    // test
    return randomIntArr;
  };

  const randomInt = getRandomInt(0, freqDict.length, 5);
  // test +
  //console.log(randomInt);

  const fiveRandomWords = [];

  for (let i = 0; i < randomIntArr.length; i++) {
    const randomWordIndex = randomIntArr[i];
    // check is the 1st letter is uppercase
    // find more elegant solution
    const randomWord = freqDict[randomWordIndex];
    const randomWordFirstLetter = randomWord[0];
    const randomWordRestPart = randomWord.substring(1);
    const randomWordUpper = randomWordFirstLetter.toUpperCase() + randomWordRestPart;
    fiveRandomWords[i] = randomWordUpper;
  }

  // test +
  //console.log(fiveRandomWords);

  const heading = fiveRandomWords.join('');
  // find more elegant solution for transform a case of the first letter of this heading
  const headingFirstLetter = heading[0].toLowerCase();
  const headingRestPart = heading.substring(1);
  const headingFinal = headingFirstLetter + headingRestPart;
  // test
  console.log(`Heading is: ${headingFinal}`);
  
  return headingFinal;
};
