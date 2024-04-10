import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Popover({title, id, todoList, setList}) {
    const [titles, setTitles] = useState(title)
    function updateTodo(){
        {
            todoList?.filter((e)=>
            {
                if(e.id == id && e.title !== titles){
                    e.title = titles
                    setList((prevList)=>[...prevList, todoList])
                    console.log(todoList);
                }
            })
        }
    }
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-5">Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="" value={titles} onChange={(e)=>{setTitles(e.target.value)}}/>
              <Button type="button" onClick={updateTodo}>Update</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </div>
  );
}
