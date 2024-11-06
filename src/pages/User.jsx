import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";

function UserPage() {
    return ( 
        <div>
            <div style={{padding: "20px"}}>
                <UserForm/>
                <UserTable/>
            </div>

        </div>
    );
}

export default UserPage;