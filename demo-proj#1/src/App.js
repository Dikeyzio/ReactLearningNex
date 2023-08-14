import InvestmentsForm
  from "./components/Form/InvestmentsForm";
import InvestmentsTable
  from "./components/Table/InvestmentsTable";
import Header from "./components/Header/Header";
import {useState} from "react";

function App() {
  const [calculatedTableData, setCalculatedTableData] = useState(null);
  const yearlyData = []

  const calculateHandler = (userInput) => {
    setCalculatedTableData(userInput);
  };

  if(calculatedTableData) {
    let currentSavings = +calculatedTableData['current-savings'];
    const yearlyContribution = +calculatedTableData['yearly-contribution'];
    const expectedReturn = +calculatedTableData['expected-return'] / 100;
    const duration = +calculatedTableData.duration;

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({

        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      })  ;
    }
  }



  // if (calculatedTableData) {
  //   calculateHandler(calculatedTableData)
  // }



  const resetHandler = () => {
    setCalculatedTableData([]);
  }

  return (
    <div>
      <Header/>
      <InvestmentsForm
          onCalculateData={calculateHandler}
          onResetData={resetHandler}
      />
      {calculatedTableData ?
          <InvestmentsTable tableData={yearlyData}
           initialInvestments={calculatedTableData['current-savings']}
          />
          : <p>NO DATA</p>}
    </div>
  );
}

export default App;
