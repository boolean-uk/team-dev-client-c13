import { useState } from "react";
import SearchIcon from "../../assets/icons/searchIcon";
import Button from "../../components/button";
import Card from "../../components/card";
import CreatePostModal from "../../components/createPostModal";
import TextInput from "../../components/form/textInput";
import Posts from "../../components/posts";
import useModal from "../../hooks/useModal";
import "./style.css";

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  // Create a function to run on user interaction
  const showModal = () => {
    setModal("Create a post", <CreatePostModal />);
    openModal();
  };

  // Search handler for fetching user data
  const handleSearch = async () => {
    if (searchVal.trim().length === 0) return;

    setIsLoading(true);
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await fetch(`/api/users/search?name=${searchVal}`);
      const result = await response.json();
      setSearchResults(result); // Store the fetched results
    } catch (error) {
      setErrorMessage("Failed to fetch search results.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle "Enter" key press to trigger search
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && searchVal.trim()) {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon">
              <p>AJ</p>
            </div>
            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts />
      </main>

      <aside>
        <Card>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextInput
              icon={<SearchIcon />}
              value={searchVal}
              name="Search"
              onChange={onChange}
              onKeyPress={handleKeyPress} // key press handler for Enter key
            />
            <Button
              onClick={handleSearch}
              disabled={!searchVal.trim() || isLoading} // Disable button when no input or loading
              text={isLoading ? "Searching..." : "Search"} // Show loading text when searching
            />
          </form>
        </Card>

        <Card>
          <h4>My Cohort</h4>
          {/* Render error message */}
          {errorMessage && <p className="error">{errorMessage}</p>}
          {/* Render search results */}
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          ) : (
            !isLoading && searchVal && <p>No users found.</p> // Show message if no users found
          )}
        </Card>
      </aside>
    </>
  );
};

export default Dashboard;
