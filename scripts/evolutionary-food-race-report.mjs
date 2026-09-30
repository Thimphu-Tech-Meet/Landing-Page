const CONFIG = {
  initialAgents: 72,
  foodCount: 190,
  maxFood: 340,
  mutationRate: 0.14,
  foodEnergy: 42,
  reproductionEnergy: 118,
  baseMetabolism: 0.19,
};

const STEPS = Number(process.argv[2] ?? 1800);
const SEEDS = [17391, 27182, 31415, 42424, 65537];

function mulberry32(seed) {
  return function random() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function clamp(value, low, high) {
  return Math.max(low, Math.min(high, value));
}

function wrap(value, max) {
  if (value < 0) return value + max;
  if (value >= max) return value - max;
  return value;
}

function shortest(delta, max) {
  if (delta > max / 2) return delta - max;
  if (delta < -max / 2) return delta + max;
  return delta;
}

function angleDiff(a, b) {
  let d = (a - b + Math.PI) % (Math.PI * 2) - Math.PI;
  return d < -Math.PI ? d + Math.PI * 2 : d;
}

function run(seed, steps) {
  const rng = mulberry32(seed);
  const rand = (min = 0, max = 1) => min + (max - min) * rng();
  const worldW = 1100;
  const worldH = 720;
  let agents = [];
  let food = [];
  let eatenTotal = 0;
  let maxGeneration = 0;
  const history = [];

  function addFood(n, burstX = null, burstY = null) {
    const patches = [
      [worldW * 0.24, worldH * 0.28, 90],
      [worldW * 0.72, worldH * 0.36, 120],
      [worldW * 0.42, worldH * 0.74, 105],
      [worldW * 0.83, worldH * 0.78, 76],
    ];
    for (let i = 0; i < n && food.length < CONFIG.maxFood; i++) {
      let x;
      let y;
      if (burstX !== null && rng() < 0.84) {
        x = burstX + rand(-54, 54);
        y = burstY + rand(-54, 54);
      } else if (rng() < 0.82) {
        const p = patches[Math.floor(rand(0, patches.length))];
        const radius = Math.sqrt(rng()) * p[2];
        const angle = rand(0, Math.PI * 2);
        x = p[0] + Math.cos(angle) * radius;
        y = p[1] + Math.sin(angle) * radius;
      } else {
        x = rand(0, worldW);
        y = rand(0, worldH);
      }
      food.push({ x: wrap(x, worldW), y: wrap(y, worldH), size: rand(0.76, 1.42) });
    }
  }

  function makeAgent(x, y, genes = null, generation = 0, hue = null) {
    return {
      x,
      y,
      angle: rand(0, Math.PI * 2),
      energy: rand(68, 104),
      age: 0,
      generation,
      hue: hue ?? rand(150, 320),
      id: Math.floor(rand(0, 1e9)),
      genes: genes ?? {
        speed: rand(0.86, 2.45),
        sense: rand(42, 122),
        turn: rand(0.06, 0.22),
        fertility: rand(0.72, 1.28),
        caution: rand(0.1, 0.74),
      },
    };
  }

  function clone(parent) {
    const genes = { ...parent.genes };
    for (const key of Object.keys(genes)) {
      if (rng() < CONFIG.mutationRate) {
        const scale = key === 'sense' ? 12 : 0.12;
        genes[key] += rand(-scale, scale);
      }
    }
    genes.speed = clamp(genes.speed, 0.55, 3.25);
    genes.sense = clamp(genes.sense, 25, 170);
    genes.turn = clamp(genes.turn, 0.035, 0.36);
    genes.fertility = clamp(genes.fertility, 0.55, 1.55);
    genes.caution = clamp(genes.caution, 0.02, 0.94);
    const child = makeAgent(wrap(parent.x + rand(-15, 15), worldW), wrap(parent.y + rand(-15, 15), worldH), genes, parent.generation + 1, (parent.hue + rand(-12, 12) + 360) % 360);
    child.energy = parent.energy * 0.46;
    parent.energy *= 0.50;
    return child;
  }

  function summarize(step) {
    const n = Math.max(agents.length, 1);
    let speed = 0;
    let sense = 0;
    let fertility = 0;
    const bins = new Set();
    for (const a of agents) {
      speed += a.genes.speed;
      sense += a.genes.sense;
      fertility += a.genes.fertility;
      bins.add(`${Math.round(a.genes.speed * 4)}:${Math.round(a.genes.sense / 18)}:${Math.round(a.genes.fertility * 3)}`);
    }
    return {
      step,
      pop: agents.length,
      generation: maxGeneration,
      speed: speed / n,
      sense: sense / n,
      fertility: fertility / n,
      diversity: bins.size,
      food: food.length,
      eaten: eatenTotal,
    };
  }

  for (let i = 0; i < CONFIG.initialAgents; i++) agents.push(makeAgent(rand(0, worldW), rand(0, worldH)));
  addFood(CONFIG.foodCount);
  history.push(summarize(0));

  for (let step = 1; step <= steps; step++) {
    if (step % 5 === 0) addFood(3);
    if (step % 70 === 0 && food.length < 90) addFood(55);

    const newborns = [];
    for (const a of agents) {
      a.age += 1;
      let target = null;
      let bestD2 = a.genes.sense * a.genes.sense;
      for (const f of food) {
        const dx = shortest(f.x - a.x, worldW);
        const dy = shortest(f.y - a.y, worldH);
        const d2 = dx * dx + dy * dy;
        if (d2 < bestD2) {
          bestD2 = d2;
          target = f;
        }
      }

      if (target) {
        const desired = Math.atan2(shortest(target.y - a.y, worldH), shortest(target.x - a.x, worldW));
        a.angle += clamp(angleDiff(desired, a.angle), -a.genes.turn, a.genes.turn);
      } else {
        a.angle += rand(-a.genes.turn, a.genes.turn) * (0.6 + a.genes.caution);
      }

      const pulse = 0.88 + 0.18 * Math.sin((step + a.id % 200) * 0.018);
      const speed = a.genes.speed * pulse;
      a.x = wrap(a.x + Math.cos(a.angle) * speed, worldW);
      a.y = wrap(a.y + Math.sin(a.angle) * speed, worldH);
      a.energy -= CONFIG.baseMetabolism + a.genes.speed * a.genes.speed * 0.055 + a.genes.sense * 0.0015 + a.genes.fertility * 0.018;

      for (let i = food.length - 1; i >= 0; i--) {
        const f = food[i];
        const dx = shortest(f.x - a.x, worldW);
        const dy = shortest(f.y - a.y, worldH);
        if (dx * dx + dy * dy < 54) {
          a.energy += CONFIG.foodEnergy * f.size;
          eatenTotal += 1;
          food.splice(i, 1);
          break;
        }
      }

      const threshold = CONFIG.reproductionEnergy * (2 - a.genes.fertility * 0.45);
      if (a.energy > threshold && agents.length + newborns.length < 260) newborns.push(clone(a));
    }

    agents = agents.filter(a => a.energy > 0 && a.age < 2500);
    agents.push(...newborns);
    if (agents.length < 16 && step % 40 === 0) {
      for (let i = 0; i < 8; i++) agents.push(makeAgent(rand(0, worldW), rand(0, worldH)));
    }
    maxGeneration = agents.reduce((m, a) => Math.max(m, a.generation), maxGeneration);
    if (step % 10 === 0) history.push(summarize(step));
  }

  const first = history[0];
  const last = summarize(steps);
  const peakPopulation = Math.max(...history.map(h => h.pop), last.pop);
  const minPopulation = Math.min(...history.map(h => h.pop), last.pop);
  const recent = history.slice(-80);
  return {
    seed,
    initialPopulation: first.pop,
    finalPopulation: last.pop,
    peakPopulation,
    minPopulation,
    finalGeneration: last.generation,
    speedStart: first.speed,
    speedEnd: last.speed,
    senseStart: first.sense,
    senseEnd: last.sense,
    fertilityStart: first.fertility,
    fertilityEnd: last.fertility,
    diversityEnd: last.diversity,
    foodEaten: last.eaten,
    recentPopulationSwing: Math.max(...recent.map(h => h.pop)) - Math.min(...recent.map(h => h.pop)),
  };
}

const results = SEEDS.map(seed => run(seed, STEPS));

console.log(`Evolutionary Food Race: ${STEPS} steps across ${SEEDS.length} seeds`);
console.table(results.map(r => ({
  seed: r.seed,
  pop: `${r.initialPopulation} -> ${r.finalPopulation}`,
  peak: r.peakPopulation,
  min: r.minPopulation,
  gen: r.finalGeneration,
  speed: `${r.speedStart.toFixed(2)} -> ${r.speedEnd.toFixed(2)}`,
  sense: `${r.senseStart.toFixed(0)} -> ${r.senseEnd.toFixed(0)}`,
  fertility: `${r.fertilityStart.toFixed(2)} -> ${r.fertilityEnd.toFixed(2)}`,
  diversity: r.diversityEnd,
  eaten: r.foodEaten,
  swing: r.recentPopulationSwing,
})));

const average = key => results.reduce((sum, r) => sum + r[key], 0) / results.length;
console.log('Emergent signals:');
console.log(`- boom/bust cycles: average recent population swing ${average('recentPopulationSwing').toFixed(1)} agents`);
console.log(`- selection: average speed changed ${(average('speedEnd') - average('speedStart')).toFixed(2)}, average sense changed ${(average('senseEnd') - average('senseStart')).toFixed(1)}`);
console.log(`- adaptation depth: average final generation ${average('finalGeneration').toFixed(1)}, average food eaten ${average('foodEaten').toFixed(0)}`);
console.log(`- diversity retained: average final genome bins ${average('diversityEnd').toFixed(1)}`);
