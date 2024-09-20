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
  const [searchVal, setSearchVal] = useState(""); // Search input state
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [newPostsubmitted, setNewPostSubmitted] = useState(false);

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  const onChangeSearchTerm = (e) => {
    setSearchVal(e.target.value);
  };

  // Show modal when the button is clicked
  const showCreatePostModal = () => {
    setModal("Create a post", <CreatePostModal newPostsubmitted={newPostsubmitted} setNewPostSubmitted={setNewPostSubmitted}/>);
    openModal();
  };

  // Search handler for fetching user data
  const handleSearch = async () => {
    if (searchVal.trim().length === 0) return; // Return if search input is empty

    try {
      // Split searchVal into firstName and lastName (assuming space separates them)
      const [firstName, lastName] = searchVal.trim().split(" ");

      // Create the appropriate query string for the API call
      const query = new URLSearchParams({
        first_name: firstName || "",
        last_name: lastName || "",
      }).toString();

      // Fetch users from the updated route with query parameters
      const response = await fetch(`/api/users?${query}`);
      const result = await response.json();

      // Handle the search results
      setSearchResults(result.users); // Store the fetched users
    } catch (error) {
      setErrorMessage("Failed to fetch search results."); // Set error message
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
            <Button text="What's on your mind?" onClick={showCreatePostModal} />
          </div>
        </Card>

        <Posts
          newPostsubmitted={newPostsubmitted}
          setNewPostSubmitted={setNewPostSubmitted}
        />
      </main>

      <aside>
        <Card>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextInput
              icon={<SearchIcon />}
              value={searchVal}
              name="Search"
              onChange={onChangeSearchTerm}
              onKeyPress={handleKeyPress} // Added key press handler for Enter key
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
