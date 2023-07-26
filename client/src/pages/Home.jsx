import React,{useState,useEffect} from 'react';
import './Home.css';
import { addCustomer, deleteCustomer, getAllCustomer, updateCustomer } from '../services/CustomerServes';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../store/userSlice';
const Home = () => {

  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editedCustomer, setEditedCustomer] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const fetchData = async () => {
    let data = await getAllCustomer();
    let fiteredData = data?.data?.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCustomers(fiteredData);
}
  useEffect(() => {
  fetchData();
  }, [searchTerm]);

  const handleSubmit = async(event) => {
    event.preventDefault();

    const customer = {
      name,
      email,
      phone,
    };

    
    
    const data= await addCustomer(customer);
        setCustomers([...customers, data]);
        await fetchData();
        setName('');
        setEmail('');
        setPhone('');
  };
  const handleDelete = async(customerId) => {
    await deleteCustomer(customerId);
    await fetchData();
    
  };
  const handleEdit = async(customerId) => {
    const customerToEdit = customers.find((customer) => customer._id === customerId);
    setEditedCustomer(customerToEdit);
    await fetchData();
  };
  const handleCancel = () => {
    setEditedCustomer({});
  };
  const handleSave = async() => {
    // Update the customer data in the database/API
    try {
      const data =await updateCustomer(editedCustomer._id,editedCustomer);
      console.log(data);
    } catch (error) {
      console.error('Error updating customer:', error)
    }
        setCustomers(customers.map((customer) => {
          if (customer._id === editedCustomer._id) {
            return editedCustomer;
          }
          return customer;
        }));
        setEditedCustomer({});
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  

  const logOutHandler=()=>{
    localStorage.removeItem("User");
        dispatch(register(null));
        navigate('/login')
  }

  return (
    <>
    <nav className="navbar">
      <div className=""></div>
      <div className="logout" onClick={logOutHandler}>LogOut</div>
    </nav>
    <div className='container'>
      <h1>Customer List</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search customers..."
        />
      </div>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>
                {editedCustomer._id === customer._id ? (
                  <input
                    type="text"
                    value={editedCustomer.name}
                    onChange={(e) =>
                      setEditedCustomer({ ...editedCustomer, name: e.target.value })
                    }
                  />
                ) : (
                  customer.name
                )}
              </td>
              <td>
                {editedCustomer._id === customer._id ? (
                  <input
                    type="email"
                    value={editedCustomer.email}
                    onChange={(e) =>
                      setEditedCustomer({ ...editedCustomer, email: e.target.value })
                    }
                  />
                ) : (
                  customer.email
                )}
              </td>
              <td>
                {editedCustomer._id === customer._id ? (
                  <input
                    type="text"
                    value={editedCustomer.phone}
                    onChange={(e) =>
                      setEditedCustomer({ ...editedCustomer, phone: e.target.value })
                    }
                  />
                ) : (
                  customer.phone
                )}
              </td>
              <td>
                {editedCustomer._id === customer._id ? (
                  <>
                    <button className="btn btn-primary" onClick={handleSave}>
                      Save
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(customer._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(customer._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="create-customer">
        <h2>Create Customer</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Phone:
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
      
    </div>
    </>
  );
};

export default Home;
