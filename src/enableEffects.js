//
// credit to mikeborozdin for the smart hack of using the function body as map key here
// https://github.com/mikeborozdin/jest-react-hooks-shallow/blob/master/src/mock-use-effect/mock-use-effect.ts
//

const effectInstance = () => {
  let lastDependencies;
  let cleanupFn = () => {};

  return {
    tryInvoke: (fn, dependencies) => {
      if (
        lastDependencies &&
        !lastDependencies.some(
          (prevDep, index) => prevDep !== dependencies[index]
        )
      ) {
        return;
      }

      cleanupFn();

      cleanupFn = fn() || (() => {});
    },
    cleanup: () => cleanupFn(),
  };
};

const fakeUseEffect = () => {
  const effectInstances = {};

  const getEffectInstance = (effect) => {
    const key = effect.toString();
    return (effectInstances[key] = effectInstances[key] || effectInstance());
  };

  return {
    invoke: (effect, dependencies) => {
      getEffectInstance(effect).tryInvoke(effect, dependencies);
    },

    cleanup: () => {
      Object.values(effectInstances).forEach((instance) => {
        instance.cleanup();
      });
    },
  };
};

export default (renderer) => {
  const useEffect = fakeUseEffect();
  const useLayoutEffect = fakeUseEffect();

  renderer._dispatcher.useEffect = useEffect.invoke;
  renderer._dispatcher.useLayoutEffect = useLayoutEffect.invoke;

  renderer._dispatcher.cleanupEffects = () => {
    useEffect.cleanup();
    useLayoutEffect.cleanup();
  }
}
