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

3. Prop 定义应该尽量详细
   
   ```
      props: {
         title: {
            type: "String",
            default: "this is a title"
         }
      }
   ```

4. 避免 v-if 和 v-for 用在一起
   
5. 统一风格 属性绑定和事件绑定统一使用一种风格

   * v-bind v-on
   * :   @

6. 在destroyed生命周期中 销毁变量和清除定时器等操作。



