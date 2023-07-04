import React, { useState } from "react";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const RankingItemForm = () => {

  const { register, control } = useForm({
    defaultValues: {
      items: [{ itemValue: "" }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  })

  const [count, setCount] = useState(1);
  const countUp = () => setCount(count + 1);
  console.log(count)
  const reduce = () => {
    if (count > 1) {
      remove(count);
      setCount(count - 1);
    }
  }
  useEffect(() => {
    append({ itemValue: "" })
  },[])

  return (
    <>
      <form>

        {fields.map((field, index) => (
          <div key={field.id}>
            <label htmlFor={'items.${index}.itemValue'}>
              {index + 1}:
              <input {...register('items.${index}.itemValue')} />
            </label>
          </div>
        ))}

        <button
          type="button"
          onClick={() => [append({ itemValue: "" }), countUp()]}
        >
          ADD
        </button>
        <br />

        <button type="button" onClick={reduce}>
          REDUCE
        </button>
        <br />
      </form>
    </>
  );
};

export default RankingItemForm;