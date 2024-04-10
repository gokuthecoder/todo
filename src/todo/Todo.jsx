import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import Popover from "./Popover.jsx";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function Todo() {
  const [list, setList] = useState([]);
  const [getValue, setGetValue] = useState("");
  const [isClick, setIsClick] = useState(false);

  const TodoList = [];
  function addTodo(e) {
    e.preventDefault();
    const todo = {
      title: getValue,
      id: String(Date.now()),
    };
    setList((prevList) => [...prevList.filter((e) => e.title), todo]);
    // console.log(list);
    setGetValue("")
  }
  
  function deleteTodo(id) {
    setIsClick(true);
    setList(prevList=>prevList.filter(item=>item.id !== id))
  }

  function editTodo() {
    setIsClick(true);
  }

  return (
    <form onSubmit={addTodo}>
      <Card>
        <CardHeader>
          <CardTitle>TODO APP</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
            <Input
              type="text"
              placeholder="Element"
              value={getValue}
              onChange={(e) => {
                console.log(e.target.value);
                setGetValue(e.target.value);
              }}
            />
            <Button type="submit">Create</Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <ul>
            {list.map(
              (item) =>
                item.title && (
                  <div key={item.id} className="my-4">
                    <li className="inline mr-5 list-disc">{item.title}</li>
                    <Button
                      className="bg-red-400 hover:bg-red-400 mr-5"
                      type="button"
                      id={item.id}
                      onClick={() => {
                        deleteTodo(item.id);
                      }}
                    >
                      <TrashIcon className="mx-2" />
                      Delete
                    </Button>
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          className="hover:bg-[#0c4a6e] bg-[#083344]"
                          type="button"
                          id={item.id}
                          onClick={() => editTodo(item)}
                        >
                          <Pencil1Icon className="mx-2" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      {isClick ? (
                        <Popover
                          title={item.title}
                          id={item.id}
                          todoList={list}
                          setList={setList}
                        />
                      ) : (
                        ""
                      )}
                    </Dialog>
                  </div>
                )
            )}
          </ul>
        </CardFooter>
      </Card>
    </form>
  );
}
