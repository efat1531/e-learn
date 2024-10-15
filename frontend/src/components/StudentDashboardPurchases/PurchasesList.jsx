import { useEffect, useState } from "react";
import PurchaseItem from "./PurchaseItem";
import { useGetUserOrdersQuery } from "../../features/api/orderApiSlice";
import { useSelector } from "react-redux";

const PurchasesList = () => {    
    const {auth} = useSelector(state => state)
    const [expandedIndex, setExpandedIndex] = useState(0);
    const [transactions,setTransactions] = useState([]);

    const {data, isLoading,isError} = useGetUserOrdersQuery();

    useEffect(() => {
        if(!isLoading && !isError)
        {
            setTransactions(data.data);
        }
    },[data,isLoading,isError])

    if(isLoading) return 'Loading...'
    

    // console.log(transactions);

  return (
    <div className="w-full p-4">
      {transactions.map((transaction, index) => (
        <PurchaseItem
          key={transaction.id}
          transaction={transaction}
          expanded={index === expandedIndex}
          auth={auth}
          onToggle={() => setExpandedIndex(index === expandedIndex ? -1 : index)}
        />
      ))}
    </div>
  )
}
export default PurchasesList