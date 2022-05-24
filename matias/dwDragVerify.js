import { defineComponent, ref, reactive, onMounted, nextTick, openBlock, createElementBlock, createElementVNode, normalizeStyle, toDisplayString, normalizeClass } from 'vue';

var script = defineComponent({
    name: 'DwDragVerify',
    props: {
        /**
         * placeholder提示文字
         */
        placeholder: {
            type: String,
            default: '请按住滑块，拖动到最右边',
        },
        /**
         * 验证通过提示文字
         */
        confirmText: {
            type: String,
            default: '验证通过',
        },
    },
    emits: {
        /**
         * 验证通过回调
         */
        dragSuccess: () => {
            return true;
        },
    },
    setup(props, context) {
        const dragDivRef = ref(null);
        const dragMoveRef = ref(null);
        const beginClientLeft = ref(0); // 初始距离屏幕左端距离
        const mouseMoveStatus = ref(false); // 拖动中
        const maxwidth = ref(0); // 拖动最大宽度，依据滑块宽度算出来的
        const confirmWords = ref(props.placeholder); // 滑块文字
        const confirmSuccess = ref(false); // 验证成功判断
        const dragBgStyle = reactive({
            width: '0px',
        });
        const dragStyle = reactive({
            left: '0px',
        });
        const dragTextStyle = reactive({
            color: '#8c8c8c',
        });
        onMounted(() => {
            nextTick(() => {
                if (!dragDivRef.value || !dragMoveRef.value) {
                    return;
                }
                // 根据滑块宽度计算可拖动最大宽度
                maxwidth.value = dragDivRef.value.clientWidth - dragMoveRef.value.clientWidth;
            });
            // 监听手指的触摸事件
            document.getElementsByTagName('html')[0].addEventListener('mousemove', dragMousemove);
            // 监听手指离开事件
            document.getElementsByTagName('html')[0].addEventListener('mouseup', dragMoseUp);
        });
        /**
         * mousedown事件
         * @param e
         */
        const dragMousedown = (e) => {
            if (!confirmSuccess.value) {
                e.preventDefault && e.preventDefault(); //阻止文字选中等 浏览器默认事件
                mouseMoveStatus.value = true;
                beginClientLeft.value = e.clientX;
            }
        };
        /**
         * mousemove事件
         * @param e
         */
        const dragMousemove = (e) => {
            if (mouseMoveStatus.value) {
                let width = e.clientX - beginClientLeft.value;
                if (width > 0 && width <= maxwidth.value) {
                    dragStyle.left = `${width}px`;
                    dragBgStyle.width = `${width}px`;
                }
                else if (width > maxwidth.value)
                    dragSuccess();
            }
        };
        /**
         * mouseup事件
         * @param e
         */
        const dragMoseUp = (e) => {
            mouseMoveStatus.value = false;
            var width = e.clientX - beginClientLeft.value;
            if (width < maxwidth.value) {
                dragStyle.left = '0px';
                dragBgStyle.width = '0px';
            }
        };
        /**
         * 验证通过
         */
        const dragSuccess = () => {
            confirmSuccess.value = true;
            confirmWords.value = props.confirmText;
            dragTextStyle.color = '#fff';
            dragStyle.left = `${maxwidth.value}px`;
            dragBgStyle.width = `${maxwidth.value}px`;
            context.emit('dragSuccess');
            // 移除
            document.getElementsByTagName('html')[0].removeEventListener('mousemove', dragMousemove);
            document.getElementsByTagName('html')[0].removeEventListener('mouseup', dragMoseUp);
        };
        return {
            confirmWords,
            confirmSuccess,
            dragBgStyle,
            dragTextStyle,
            dragStyle,
            dragMousedown,
            dragMousemove,
            dragMoseUp,
            dragSuccess,
        };
    },
});

const _hoisted_1 = {
  class: "drag-verify",
  ref: "dragDivRef"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", {
      class: "drag_bg",
      style: normalizeStyle(_ctx.dragBgStyle)
    }, null, 4 /* STYLE */),
    createElementVNode("div", {
      class: "drag_text slidetounlock",
      style: normalizeStyle(_ctx.dragTextStyle)
    }, toDisplayString(_ctx.confirmWords), 5 /* TEXT, STYLE */),
    createElementVNode("div", {
      ref: "dragMoveRef",
      onMousedown: _cache[0] || (_cache[0] = (...args) => (_ctx.dragMousedown && _ctx.dragMousedown(...args))),
      class: normalizeClass(["handler handler_bg", { handler_ok_bg: _ctx.confirmSuccess }]),
      style: normalizeStyle(_ctx.dragStyle)
    }, null, 38 /* CLASS, STYLE, HYDRATE_EVENTS */)
  ], 512 /* NEED_PATCH */))
}

script.render = render;
script.__scopeId = "data-v-8d8ae88c";
script.__file = "src/components/dwDragVerify/src/DwDragVerify.vue";

// 定义 install 方法， App 作为参数
script.install = (app) => {
    app.component(script.name, script);
};

export { script as default };
