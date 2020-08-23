## enzyme-adapter-react-16-with-shallow-effects

This extremely-long-named package is a "fork" of the [react-16 adapter](https://github.com/enzymejs/enzyme/tree/master/packages/enzyme-adapter-react-16) included with enzyme, with one difference that applies only to `shallow()` testing:

- useEffect and useLayoutEffect hooks are supported, with dependency change tracking. See [this enzyme issue for more information](https://github.com/enzymejs/enzyme/issues/2086).

Also, under the hood, it uses `react-shallow-renderer` rather than `react-test-renderer/shallow`. Ongoing development of `react-test-renderer/shallow` has been moved to `react-shallow-renderer`. This should not result in any observable differences in behavior.
