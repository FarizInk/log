const e: string[] = ["Shift", "Meta", "Alt", "Control"];
const t: string = "object" === typeof navigator ? navigator.platform : "";
const n: boolean = /Mac|iPod|iPhone|iPad/.test(t);
const r: string = n ? "Meta" : "Control";
const i: string[] = "Win32" === t ? ["Control", "Alt"] : n ? ["Alt"] : [];

function o(e: KeyboardEvent, t: string): boolean {
  return "function" === typeof e.getModifierState && (e.getModifierState(t) || i.includes(t) && e.getModifierState("AltGraph"));
}

function a(e: string): [string[], string] {
  return e.trim().split(" ").map(function (e) {
    const t = e.split(/\b\+/);
    const n = t.pop();
    return [t.map(function (e) {
      return "$mod" === e ? r : e
    }), n]
  }) as [string[], string];
}

function u(t: Record<string, string>, n?: { timeout?: number }): (t: Event) => void {
  let r;
  void 0 === n && (n = {});
  const i = null != (r = n.timeout) ? r : 1e3;
  const u = Object.keys(t).map(function (e) {
    return [a(e), t[e]]
  }) as [string[][], string][];
  const c = new Map();
  let f = null;
  return function (t: Event): void {
    t instanceof KeyboardEvent && (u.forEach(function (n) {
      const r = n[0], i = n[1];
      const a = c.get(r) || r;

      function checkKeybinding(t: KeyboardEvent, n: string[]): boolean {
        return !(n[1].toUpperCase() !== t.key.toUpperCase() && n[1] !== t.code || n[0].find(function (e) {
          return !o(t, e)
        }) || e.find(function (e) {
          return !n[0].includes(e) && n[1] !== e && o(t, e)
        }))
      }

      if (!checkKeybinding(t, a[0])) {
        o(t, t.key) || c.delete(r);
      } else if (a.length > 1) {
        c.set(r, a.slice(1));
      } else {
        c.delete(r);
        i(t);
      }
    }), f && clearTimeout(f), f = setTimeout(c.clear.bind(c), i))
  }
}

export const createKeybindingsHandler = u;
export const parseKeybinding = a;
const tinykeys = function (e: HTMLElement, t: Record<string, string>, n?: { event?: string }): () => void {
  let r;
  void 0 === n && (n = {});
  const i = null != (r = n.event) ? r : "keydown";
  const o = u(t, n);
  return e.addEventListener(i, o),
    function () {
      e.removeEventListener(i, o)
    }
};

export default tinykeys