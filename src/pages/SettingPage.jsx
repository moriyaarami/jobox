import { useAuth } from "@/contexts/AuthContext";
import { SetLogInStorage } from "@/LocalStorage/logInStorage";
import { Button } from "@/components/ui/button";
const SettingPage=()=>{
    
    const {logout} = useAuth();

    const handleOnClick=()=>{
        confirm("Are you sure you want to log out?") && (
            logout(),
            SetLogInStorage('false')
        );
    }

    return(
        <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">הגדרות</h1>
           <Button size="lg" variant="destructive" onClick={handleOnClick}>
              התנתק
            </Button>
        </div>
    )
}

export default SettingPage;