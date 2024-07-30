
const delay = 0;
const start = performance.now();
const initFuel = 1000;
let fuel = initFuel;
let signal, pause;

async function topLoop() {
  while(true) {
    const { promise: newSignal, resolve: newPause } = Promise.withResolvers();
    signal = newSignal;
    pause = newPause;

    // Yield control back for whoever signals us, using the pause resolver
    //console.log("Event loop ready at ", performance.now(start));
    const restart = await signal;
    setTimeout(() =>{
      restart();
    }, delay);
  }
}

async function checkPause() {
  fuel -= 1;
  if(fuel === 0) {
    fuel = initFuel;
    const { promise: pending, resolve: restart } = Promise.withResolvers();
    pause(restart);
    return pending;
  }
  else {
    return;
  }
}

async function sum(n) {
  await checkPause();
  //console.log("Processing: ", n);
  if(n === 0) {
    return 0;
  }
  else {
    return n + await sum(n - 1);
  }
}

topLoop();

const ans = await sum(1000000);
console.log(ans);
console.log(performance.now(start))
