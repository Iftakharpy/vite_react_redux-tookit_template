import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../app/store';

export interface TodoType{
    id: string;
    title: string;
    isDone: boolean;
}

export interface TodoState {
  todoList: TodoType[];
}

const initialState: TodoState = {
  todoList: [],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      let newTodo = {
        id: uuidv4(),
        title: action.payload,
        isDone: false,
      } as TodoType
      state.todoList.push(newTodo)
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(todo=>todo.id!==action.payload)
    },
    markTodoDone: (state, action: PayloadAction<string>)=>{
        // let todoIdx = state.todoList.findIndex(todo=>todo.id==action.payload)
        let todoToUpdate = state.todoList.find(todo=>todo.id===action.payload)
        if (todoToUpdate) todoToUpdate.isDone = true
    },
    markTodoUndone: (state, action: PayloadAction<string>)=>{
        // let todoIdx = state.todoList.findIndex(todo=>todo.id==action.payload)
        let todoToUpdate = state.todoList.find(todo=>todo.id===action.payload)
        if (todoToUpdate) todoToUpdate.isDone = false
    },
  },
})


// Action creators are generated for each case reducer function
export const { addTodo, removeTodo, markTodoDone, markTodoUndone } = todoSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTodoList = (state: RootState) => state.todo.todoList

export const todoReducer = todoSlice.reducer
export default todoSlice.reducer
