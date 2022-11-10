import React, { useState, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { removeTodo, selectTodoList, TodoType, markTodoDone, markTodoUndone } from './TodoSlice'
import { ImCheckboxChecked, ImCheckboxUnchecked, ImBin2 } from 'react-icons/im'
import { TbListDetails, TbListCheck } from 'react-icons/tb'


export function TodoList(){
    const [appliedFilter, setAppliedFilter] = useState('All')
    const todoList = useAppSelector(selectTodoList)

    const showingTodos = useMemo(()=>{
        if(appliedFilter==="All"){
            return todoList
        }else if(appliedFilter==='Done'){
            return todoList.filter(todo=>todo.isDone)
        }else if(appliedFilter==='Todo'){
            return todoList.filter(todo=>!todo.isDone)
        }else{
            return todoList
        }
    }, [appliedFilter, todoList])

    return <section className='todos'>
        <h2>Todo list</h2>
        <div className='filter'>
            <span>Filters: </span>
            <ul className='list'>
                <li data-applied={appliedFilter==='All'} onClick={()=>setAppliedFilter('All')} title="Show all" >All</li>
                <li data-applied={appliedFilter==='Done'} onClick={()=>setAppliedFilter('Done')} ><TbListCheck title='Show done tasks'/></li>
                <li data-applied={appliedFilter==='Todo'} onClick={()=>setAppliedFilter('Todo')} ><TbListDetails title='Show todo tasks'/></li>
            </ul>
            <span>{showingTodos.length}/{todoList.length}</span>
        </div>
        <section className='todo-list'>
            {showingTodos.length!==0 ? showingTodos.map(todo=><Todo todo={todo} key={todo.id}/>) : <h4>No task found with the filter "{appliedFilter}"</h4>}
        </section>
    </section>
}


export function Todo({ todo }:{todo: TodoType}) {
  const dispatch = useAppDispatch()

  return (
    <article className='todo'>
        <div className='details'>
            <h3 className='title'>{todo.title}</h3>
        </div>
        <div className='actions'>
            {
                todo.isDone ? 
                    <ImCheckboxChecked title='Mark as todo' onClick={()=>dispatch(markTodoUndone(todo.id))} /> : 
                    <ImCheckboxUnchecked title='Mark as done' onClick={()=>dispatch(markTodoDone(todo.id))} />
            }
            <ImBin2 title='Remove' onClick={()=>dispatch(removeTodo(todo.id))} />
        </div>
    </article>
  )
}
