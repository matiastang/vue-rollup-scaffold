import { defineComponent, openBlock, createElementBlock, createElementVNode, Fragment, renderList, normalizeStyle, createCommentVNode, toDisplayString } from 'vue';

var script = defineComponent({
    name: 'DwFilterRuler',
    props: {
        /**
         * 范围（默认0%-100%）
         */
        range: {
            type: Array,
            default: () => [
                '0%',
                '10%',
                '20%',
                '30%',
                '40%',
                '50%',
                '60%',
                '70%',
                '80%',
                '90%',
                '100%',
            ],
        },
        /**
         * 颜色#7c7c7c
         */
        rulerColor: {
            type: String,
            default: 'var(--themeColor)', //'#7c7c7c',
        },
    },
});

const _hoisted_1 = { class: "dw-ruler" };
const _hoisted_2 = { class: "scale-lines" };
const _hoisted_3 = { class: "ruler-texts" };
const _hoisted_4 = { class: "ruler-text" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.range, (item, index) => {
        return (openBlock(), createElementBlock("div", {
          class: "scale-line-container",
          key: item,
          style: normalizeStyle({ width: `${100 / _ctx.range.length}%` })
        }, [
          createElementVNode("div", _hoisted_3, [
            createCommentVNode(" :style=\"{ color: `${rulerColor}` }\" "),
            createElementVNode("div", _hoisted_4, toDisplayString(item), 1 /* TEXT */),
            createElementVNode("div", {
              class: "scale-line",
              style: normalizeStyle({ height: '0.6rem' })
            }, null, 4 /* STYLE */),
            createCommentVNode(" , background: `${rulerColor}` ")
          ]),
          (index !== _ctx.range.length - 1)
            ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "scale-line",
                style: normalizeStyle({ height: '0.3rem' })
              }, null, 4 /* STYLE */))
            : createCommentVNode("v-if", true),
          createCommentVNode(" , background: `${rulerColor}` ")
        ], 4 /* STYLE */))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

script.render = render;
script.__scopeId = "data-v-c70e99f2";
script.__file = "src/components/dwFilterRuler/DwFilterRuler.vue";

// 定义 install 方法， App 作为参数
script.install = (app) => {
    app.component(script.name, script);
};

export { script as default };
