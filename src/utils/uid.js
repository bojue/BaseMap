let seed = 0;

export function createUid() {
  seed += 1;
  return `comp_${Date.now()}_${seed}`;
}
