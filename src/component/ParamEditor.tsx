import { FC, useState } from 'react';

// Интерфейсы
interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: FC = () => {
  const [editedParams, setEditedParams] = useState<Map<number, string>>(new Map());

  const params = [
    {
      id: 1,
      name: "Назначение",
    },
    {
      id: 2,
      name: "Длина",
    },
  ];
  
  const model = {
    paramValues: [
      {
        paramId: 1,
        value: "повседневное",
      },
      {
        paramId: 2,
        value: "макси",
      },
    ],
  };



  // Обновление значения параметра при его изменении
  const handleParamChange = (paramId: number, value: string) => {
    setEditedParams((prevEditedParams) => new Map(prevEditedParams.set(paramId, value)));
  };

  // Получение полной структуры Model с учетом изменений
  const getModel = (): Model => {
    // Объединяем исходные значения и измененные значения параметров
    const updatedParamValues = model.paramValues.map((paramValue) => ({
      ...paramValue,
      value: editedParams.get(paramValue.paramId) || paramValue.value,
    }));

    return {
      paramValues: updatedParamValues,
    };
  };

  return (
    <div>
      {params.map((param) => (
        <div key={param.id}>
          {param.name} [
          <input
            type="text"
            value={
              editedParams.get(param.id) ||
              model.paramValues.find((pv) => pv.paramId === param.id)?.value ||
              ''
            }
            onChange={(e) => handleParamChange(param.id, e.target.value)}
          />
          ]
        </div>
      ))}
    </div>
  );
};

export default ParamEditor;