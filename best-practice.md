## ![](/screenshot/best-practice.jpeg)

## 最佳实践

1. 组件的 data 必须是一个函数。

   > 原因： 防止数据操作污染 组件数据独立

   ```
   data: ()=> {
       name: "",
       list: []
   }
   ```

2. v-for添加key

   > 避免潜在的性能风险， 让diff算法能够有效的执行

   ```
   // bad
   <todo-item v-for="item in todos">
     {{todo.name}}
   </todo-item>
   // not good
   <todo-item 
     :key="index" v-for="(item, index) in todos">
     {{todo.name}}
   </todo-item>
   // better
   <todo-item
   :key="item.id" v-for="item in todos">
      {{todo.name}}
   </todo-item>
   ```

   原理: [diff algorithm](https://reactjs.org/docs/reconciliation.html#component-elements-of-the-same-type "diff algorithm")

3. Prop 定义应该尽量详细

   > 方便其他同学使用组件的时候，在开发阶段，暴露出使用不当的问题

   ```
      props: {
         title: {
            type: "String",
            default: "this is a title"
         }
      }
   ```

4. 通用的业务组件，也需要添加必要的README.md信息（包含对应的截图，gif最好）

5. 避免 v-if 和 v-for 用在一起

   > 主要原因是v-for的指令优先级比v-if高，导致所有的数据都会遍历。使用computed数据进行缓存

   参见[vue风格指南](https://cn.vuejs.org/v2/style-guide/#避免-v-if-和-v-for-用在一起-必要)

6. 统一风格 属性绑定和事件绑定统一使用一种风格

   > 主要考虑两点，少些代码，统一风格， 所以建议使用 : @
   >
   > * v-bind v-on
   > * :   @
   >   ```
   >   // bad
   >   <div v-bind:style="{}" @click="clickHanle"></div>
   >   // good
   >   <div :style="{}" @click="clickHanle"></div>
   >   ```

7. 在destroyed生命周期中 销毁变量和清除定时器，解绑dom事件等操作。

   > 避免潜在的bug和无用代码执行
   >
   > ```
   > destroyed() {
   >    clearInterval(this.countDownTimer);
   > }
   > ```

8. 为组件样式设置作用域

   > 避免互相样式覆盖

   ```
      <template>
         <div class="home"> 
         //output class="button" data-v-1c4665c3
            <div class="button"></div>
         </div>    
      </template>

      <style scoped>
      .button {
        border: none;
        border-radius: 2px;
      }

      .button-close {
        background-color: red;
      }
   ```

   > 除了这种方式 当然你也可以使用 css modules

   ```
      <template>
         <div class="home"> 
         //output class="Home_button_2M_ML"
            <div :class="$style.button"></div>
         </div>    
      </template>
      <style module>
      .button {
        border: none;
        border-radius: 2px;
      }

      .button-close {
        background-color: red;
      }
   ```

   性能PK, render tree 的构建非常快，所以基本上我们的样式书写比较随意  
   下面三种写法，理论上的效率排序\(css parser的匹配顺序是从右向左\)

   1. .Home\_button\_2M\_ML
   2. .button\[data-v-1c4665c\]  \(注意 请尽量使用 class+属性的组合， 而非 标签+属性的组合\)
   3. .home .content .buttong

性能和书写方便结合，个人觉得使用scoped的方式 可能比较好

