"use client"
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import User from "@/types"
import {
  DropdownMenu,

  DropdownMenuContent,

  DropdownMenuItem,

  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { userInfo } from "@/lib/actions/register";
import { FaUser } from "react-icons/fa";
import { LogoutButton } from "./Logout";
import { ExitIcon } from "@radix-ui/react-icons";
import { CircleUser, CircleUserRound } from "lucide-react";
interface props{
  username: string | undefined;
}
const Accountdialog = ({username}:props) => {
    const [user,setUser] = useState<User[] | any>([]);
    const [loading,setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        userInfo().then(res=>setUser(res)).catch((error) =>console.log(error));
        
        setLoading(false);
    }, []);   
    
    
    

    
    return (
    <div className="cursor-pointer">

        <DropdownMenu>

      <DropdownMenuTrigger asChild>
    {/* <Avatar> */}
        {/* <AvatarImage src="" alt="logo"/> */}
        {user.image && loading === false && user.image!== null ? (
            <Avatar className="">
                <AvatarImage src={user.image} alt="logo"/>
            <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
            </Avatar>
        ) :(

            
            <Button size="icon" className="rounded-full" variant="outline">

        <FaUser />
        </Button>
            )
        }
        
    {/* </Avatar> */}
        
        </DropdownMenuTrigger>
       <DropdownMenuContent className="w-40 flex flex-col gap-2" align="end">
        <DropdownMenuItem className="cursor-default bg-slate-200 truncate">
            <CircleUser className="mr-2 h-6 w-5" />
            {username}
          </DropdownMenuItem>
          {/* logout */}
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
};

export default Accountdialog;
