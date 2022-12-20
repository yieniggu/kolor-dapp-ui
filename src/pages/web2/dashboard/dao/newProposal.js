import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { createProposal } from "../../../../store/slices/dao";

export const NewProposal = ({ tokenId }) => {
  const { id } = useParams();

  const { creatingProposal } = useSelector((state) => state.dao);

  const [formValues, handleInputChange, reset] = useForm({
    title: "",
    summary: "",
    discussion: "",
    duration: 2,
  });

  const { title, summary, discussion, duration } = formValues;
  const [options, setOptions] = useState([]);
  const [addingOption, setAddingOption] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [summaryError, setSummaryError] = useState(false);

  const dispatch = useDispatch();

  const addOption = (e) => {
    if (e.key === "Enter") {
      setOptions((current) => [...current, e.target.value]);
      console.log(options);
      setAddingOption(false);
    }
  };

  const removeOption = ({ target }) => {
    const newOptions = options.filter(
      (option, index) => index != target.getAttribute("name")
    );
    setOptions(newOptions);
  };

  const onChange = (e) => {
    if (e.target.name === "title") setTitleError(false);
    if (e.target.name === "summary") setSummaryError(false);
    handleInputChange(e);
  };

  const submitProposal = () => {
    if (title.length === 0) setTitleError(true);
    if (summary.length === 0) setSummaryError(true);

    if (!titleError && !summaryError && options.length >= 2) {
      const data = {
        title,
        summary,
        options,
        duration,
        tokenId,
      };
      reset();
      setOptions([]);
      dispatch(createProposal(data, id));
    }
  };

  return (
    <div className="flex flex-col xl:flex-row ml-4 w-full 3xl:w-1/2 grow">
      <div className="flex flex-col ml-4 w-full">
        <h1 className="text-white text-md">New Proposal</h1>
        <h2 className="text-gray-600 text-sm">Title</h2>
        <input
          name="title"
          value={title}
          className="rounded-lg text-gray-600 text-sm font-sans border border-gray-600 bg-black bg-opacity-80 focus:text-white w-3/5 px-4"
          onChange={onChange}
        />
        {titleError && (
          <p className="text-xs text-red-500 font-sans">
            A valid title must be provided
          </p>
        )}

        <h2 className="text-gray-600 text-sm mt-10">Summary</h2>
        <textarea
          name="summary"
          className="rounded-lg text-gray-600 text-sm font-sans border border-gray-600 bg-black bg-opacity-80 focus:text-white w-4/5 h-2/5 px-4"
          value={summary}
          onChange={onChange}
        />
        {summaryError && (
          <p className="text-xs text-red-500 font-sans">
            A valid summary must be provided
          </p>
        )}
        <h2 className="text-gray-600 text-sm mt-10">Discussion thread</h2>
        <input
          name="discussion"
          className="rounded-lg text-gray-600 text-sm font-sans border border-gray-600 bg-black bg-opacity-80 focus:text-white w-3/5 px-4"
          value={discussion}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col ml-4 mt-6 w-full xl:w-3/5 3xl:w-2/5 gap-4">
        <h1 className="text-gray-600 text-sm">Options</h1>
        {options.map((option, idx) => (
          <div key={idx} className="flex flex-row gap-2">
            <p className="text-app-green rounded-lg border border-white w-full px-4 py-2">
              {option}
            </p>
            <i
              name={idx}
              className="text-red-400 fa-solid fa-trash my-auto cursor-pointer mr-4 md:mr-0"
              onClick={removeOption}
            ></i>
          </div>
        ))}
        {options.length < 3 && (
          <div>
            {addingOption && (
              <input
                type="text"
                className="rounded-lg text-gray-600 text-sm font-sans border border-gray-600 bg-black bg-opacity-80 focus:text-white w-full px-4 mb-4"
                onKeyDown={addOption}
              />
            )}
            <div className="flex flex-row gap-6 tiny:mr-2">
              <button
                className="font-sans  text-white rounded-full border border-gray-400 xl:px-0 3xl:px-2 3xl:w-8 xl:py-1 w-8 h-8"
                onClick={() => setAddingOption(true)}
              >
                <i className="fa-solid fa-plus fa-xs my-auto"></i>
              </button>
              <h1 className="font-sans text-white my-auto">
                Add option (max 3)
              </h1>
            </div>
          </div>
        )}
        {options.length < 2 && (
          <p className="text-red-500 text-xs font-sans">
            At least two options must be provided
          </p>
        )}
        <h2 className="text-gray-600 text-sm mt-10">Duration (in days)</h2>
        <input
          type="number"
          min="2"
          max="14"
          name="duration"
          className="rounded-lg text-gray-600 text-sm font-sans border border-gray-600 bg-black bg-opacity-80 focus:text-white w-3/5 pl-4"
          value={duration}
          onChange={handleInputChange}
        />
        <p className="text-red-500 text-xs font-sans">Min two, max seven</p>

        <button
          className="my-auto mr-auto text-white font-sans text-sm rounded-full px-6 md:w-full bg-interaction bg-opacity-75 hover:bg-opacity-100"
          onClick={submitProposal}
          disabled={creatingProposal}
        >
          {creatingProposal ? (
            <span className="animate-ping">Please Wait</span>
          ) : (
            "Submit proposal"
          )}
        </button>
      </div>
    </div>
  );
};
