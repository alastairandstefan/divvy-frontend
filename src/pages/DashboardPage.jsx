import GroupCard from "../components/GroupCard";
import { useQuery } from "react-query";
import axios from "axios";
import Expense from "../components/Expense";
import { Link } from "react-router-dom";
import {
  getExpensesOfUser,
  getGroupsOfUser,
} from "../components/CRUDFunctions";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useQueryClient } from "react-query";

const DashboardPage = () => {
  const groups = useQuery("groups", getGroupsOfUser);
  const expenses = useQuery("expenses", getExpensesOfUser);


  const { user } = useContext(AuthContext);

  if (groups.isLoading || expenses.isLoading) return <div>Loading...</div>;
  if (groups.error || expenses.error) return <div>An error has occurred.</div>;

  return (
    <div className="DASHBOARD flex flex-col md:flex-row justify-between w-full h-auto min-h-[92.5%] p-3 bg-appbg">
      <div
        className="RECEIPT flex w-full flex-col  mt-3 md:w-[49%]"
        style={{ filter: `drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))` }}
      >
        <div className="w-full bg-receipt ">
          {user.name ? (
            <h1 className="text-center pt-3">
              <span className="font-bold text-lg">Hi {user.name}</span>, <br />{" "}
              here is your expense overview
            </h1>
          ) : (
            <h1>Welcome</h1>
          )}
          <p className="text-center">
            ************************************************
          </p>

          {/* Expenses */}
          <div className="flex flex-col items-center">
            {expenses.data &&
              expenses.data
                .slice(0, 3)
                .map((expense) => (
                  <Expense
                    key={expense._id}
                    amount={expense.amount}
                    expenseName={expense.expenseName}
                    payer={expense.payer}
                    splits={expense.splits}
                    expenseId={expense._id}
                    groupId={expense.group}
                  />
                ))}
            {expenses.data.length === 0 && (<div>
                <p className="text-center my-10 font-bold">No expenses yet</p>
                <p className="text-center mb-10">&#8595; Create a group and an expense to it &#8595;</p>
                <p className="text-center">
            ************************************************
          </p>
              </div>)}
            {expenses.data.length > 3 && (
              <Link to="/expenses" className="btn btn-sm  m-3">
                Show full list
              </Link>
            )}
          </div>
        </div>
        <div className="">
          <svg
            className="PAPERTEAR w-full h-auto -mt-1"
            height="17"
            viewBox="0 0 368 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M368 0H0V17H4.6478C4.6478 14.2654 7.36241 12.0488 10.7084 12.0488C14.0543 12.0488 16.766 14.2654 16.766 17H20.4292C20.4292 14.2654 23.144 12.0488 26.49 12.0488C29.8359 12.0488 32.5505 14.2654 32.5505 17H36.214C36.214 14.2654 38.9253 12.0488 42.2713 12.0488C45.6173 12.0488 48.3321 14.2654 48.3321 17H51.9953C51.9953 14.2654 54.7066 12.0488 58.0561 12.0488C61.4021 12.0488 64.1134 14.2654 64.1134 17H67.7765C67.7765 14.2654 70.4914 12.0488 73.8374 12.0488C77.1835 12.0488 79.8949 14.2654 79.8949 17H83.5615C83.5615 14.2654 86.2727 12.0488 89.6223 12.0488C92.9682 12.0488 95.6796 14.2654 95.6796 17H99.3427C99.3427 14.2654 102.054 12.0488 105.404 12.0488C108.75 12.0488 111.461 14.2654 111.461 17H115.124C115.124 14.2654 117.839 12.0488 121.185 12.0488C124.531 12.0488 127.243 14.2654 127.243 17H129.768H130.909C130.909 14.2654 133.617 12.0488 136.963 12.0488C140.309 12.0488 143.021 14.2654 143.021 17H146.677C146.677 14.2654 149.389 12.0488 152.732 12.0488C156.077 12.0488 158.789 14.2654 158.789 17H162.446C162.446 14.2654 165.157 12.0488 168.503 12.0488C171.846 12.0488 174.561 14.2654 174.561 17H178.221C178.221 14.2654 180.932 12.0488 184.278 12.0488C187.624 12.0488 190.336 14.2654 190.336 17H193.996C193.996 14.2654 196.704 12.0488 200.05 12.0488C203.396 12.0488 206.107 14.2654 206.107 17H209.767C209.767 14.2654 212.478 12.0488 215.821 12.0488C219.17 12.0488 221.882 14.2654 221.882 17H225.542C225.542 14.2654 228.253 12.0488 231.599 12.0488C234.945 12.0488 237.657 14.2654 237.657 17H241.32H241.735V15.3118C242.586 13.4184 244.764 12.0488 247.378 12.0488C250.724 12.0488 253.438 14.2654 253.438 17H257.102C257.102 14.2654 259.813 12.0488 263.162 12.0488C266.505 12.0488 269.22 14.2654 269.22 17H272.883C272.883 14.2654 275.594 12.0488 278.944 12.0488C282.29 12.0488 285.001 14.2654 285.001 17H288.664C288.664 14.2654 291.379 12.0488 294.725 12.0488C298.074 12.0488 300.786 14.2654 300.786 17H304.449C304.449 14.2654 307.161 12.0488 310.507 12.0488C313.856 12.0488 316.567 14.2654 316.567 17H320.231C320.231 14.2654 322.942 12.0488 326.288 12.0488C329.637 12.0488 332.349 14.2654 332.349 17H336.012C336.012 14.2654 338.724 12.0488 342.073 12.0488C345.419 12.0488 348.13 14.2654 348.13 17H351.794C351.794 14.2654 354.508 12.0488 357.854 12.0488C361.2 12.0488 363.912 14.2654 363.912 17H368V0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      <div className="GROUPS w-full mt-5 md:w-[49%] md:mt-3">
        <h2 className="text-lg font-bold">MY GROUPS</h2>
        <div className="w-full flex justify-center">
          <div className="flex flex-wrap mt-3 gap-4 w-full">
           
            {groups.data &&
              groups.data.map((group) => (
                
                <GroupCard
                  groupName={group.groupName}
                  key={group._id}
                  id={group._id}
                  groupColor={group.colorCode}
                />
              ))}
            <Link
              to={"/group/create"}
              className="btn h-10 border-1 border-slate-500 border-dashed bg-transparent basis-[100%] md:basis-[48%] rounded-xl"
            >
              +
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
