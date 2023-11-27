
import AvatarUser from "../header/Avatar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
       <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/115954425?v=4" alt="@oleh" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm text-muted-foreground">
            olivia.martin@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">Köln</div>
      </div>
      <div className="flex items-center">
     <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/118743816?v=4" alt="@dirk" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
        </div>
        <div className="ml-auto font-medium">Berlin</div>
      </div>
      <div className="flex items-center">
     <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/115074046?v=4" alt="@naz" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-sm text-muted-foreground">
            isabella.nguyen@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">Hamburg</div>
      </div>
      <div className="flex items-center">
     <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/117680393?s=400&u=28022f1f64dda7188d262f2d508dbd78f805d3ef&v=4" alt="@berat" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="text-sm text-muted-foreground">will@email.com</p>
        </div>
        <div className="ml-auto font-medium">Dusseldorf</div>
      </div>
      <div className="flex items-center">
     <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/115162901?v=4" alt="@ghenwa" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
        </div>
        <div className="ml-auto font-medium">Munich</div>
      </div>
    </div>
  )
}
