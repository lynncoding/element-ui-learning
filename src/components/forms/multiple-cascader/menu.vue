<script>
  import { isDef } from 'element-ui/src/utils/shared';
  import scrollIntoView from 'element-ui/src/utils/scroll-into-view';
  import { generateId } from 'element-ui/src/utils/util';

  export default {
    name: 'CascaderMenu',

    data() {
      return {
        inputWidth: 0,
        options: [],
        props: {},
        visible: false,
        activeValue: [],
        value: [],
        expandTrigger: 'click',
        changeOnSelect: false,
        popperClass: '',
        hoverTimer: 0,
        clicking: false
      };
    },

    watch: {

    },

    computed: {
      id() {
        return generateId();
      }
    },

    methods: {
    },

    render(h) {
      return (
        <transition name="el-zoom-in-top">
          <div
            v-show={visible}
            class={[
              'el-cascader-menus el-popper'
            ]}
            ref="wrapper"
          >
            <div x-arrow class="popper__arrow"></div>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </div>
        </transition>
      );
    }
  };
</script>
