import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from "react";
import { fetchAllUserAPI } from "../service/api.service";

function UserPage() {
  const [dataUser, setDataUser] = useState([]);

  const [current, setCurrent]= useState(1)
  const [pagesize, setPagesize]= useState(5)
  const [total, setTotal]= useState(0)


  useEffect(() => {
    loadUser();
  }, [current, pagesize]);

  const loadUser = async () => {
    const res = await fetchAllUserAPI(current, pagesize);
    if(res.data){
      setDataUser(res.data.result)
      setCurrent(res.data.meta.current)
      setPagesize(res.data.meta.pageSize)
      setTotal(res.data.meta.total)
      
    }
    
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <UserForm 
            loadUser={loadUser}
        />
        <UserTable 
            loadUser={loadUser}
            dataUser={dataUser}
            current={current}
            pageSize={pagesize}
            total={total}
            setCurrent={setCurrent}
            setPagesize={setPagesize}
        />
      </div>
    </div>
  );
}

export default UserPage;
