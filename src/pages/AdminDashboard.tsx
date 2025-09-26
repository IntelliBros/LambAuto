import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, TrashIcon, EditIcon, LogOutIcon, CarIcon, XIcon } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

interface Car {
  id: string;
  title: string;
  year: string;
  yearCount: string;
  color: string;
  mileage: string;
  price: string;
  numericPrice: number;
  brand: string;
  bodyStyle: string;
  image: string;  // For backward compatibility
  images?: string[];  // New: array of images
  priceSub?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<Omit<Car, 'id'>>({
    title: '',
    year: new Date().getFullYear().toString(),
    yearCount: '',
    color: '',
    mileage: '',
    price: '',
    numericPrice: 0,
    brand: '',
    bodyStyle: '',
    image: '',
    images: [],
    priceSub: ''
  });

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    // Load existing cars from localStorage
    const storedCars = localStorage.getItem('inventoryCars');
    if (storedCars) {
      setCars(JSON.parse(storedCars));
    } else {
      // Initialize with default cars if no data exists
      const defaultCars: Car[] = [
        {
          id: '1',
          title: 'ASTON MARTIN VALKYRIE',
          year: '2023',
          yearCount: '(23)',
          color: 'Lennox Green',
          mileage: '107',
          price: 'POA',
          numericPrice: 2500000,
          brand: 'Aston Martin',
          bodyStyle: 'Hypercar',
          image: "https://images.unsplash.com/photo-1676548784916-c899cf0e3065?q=80&w=2940&auto=format&fit=crop"
        },
        {
          id: '2',
          title: 'LAMBORGHINI AVENTADOR SVJ',
          year: '2023',
          yearCount: '(75)',
          color: 'MANUFAKTUR Verde Mantis',
          mileage: '15',
          price: 'POA',
          numericPrice: 800000,
          brand: 'Lamborghini',
          bodyStyle: 'Supercar',
          image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80'
        },
        {
          id: '3',
          title: 'FERRARI SF90 STRADALE',
          year: '2023',
          yearCount: '(74)',
          color: 'Black Sapphire Metallic',
          mileage: '968',
          price: '£699,950',
          numericPrice: 699950,
          brand: 'Ferrari',
          bodyStyle: 'Supercar',
          image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
        },
        {
          id: '4',
          title: 'LAMBORGHINI URUS',
          year: '2023',
          yearCount: '(25)',
          color: 'Santorini Black',
          mileage: '499',
          price: '£124,950',
          numericPrice: 124950,
          brand: 'Lamborghini',
          bodyStyle: 'SUV',
          priceSub: 'inc. VAT',
          image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=2940&auto=format&fit=crop'
        }
      ];
      setCars(defaultCars);
      localStorage.setItem('inventoryCars', JSON.stringify(defaultCars));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'price' && value !== 'POA' ? {
        numericPrice: parseInt(value.replace(/[^0-9]/g, '')) || 0
      } : name === 'price' && value === 'POA' ? {
        numericPrice: 0
      } : {})
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCar: Car = {
      ...formData,
      id: editingCar ? editingCar.id : Date.now().toString(),
      numericPrice: formData.price === 'POA' ? 0 : parseInt(formData.price.replace(/[^0-9]/g, '')) || 0,
      images: uploadedImages.length > 0 ? uploadedImages : formData.images || [],
      image: uploadedImages.length > 0 ? uploadedImages[0] : formData.image  // Set first image as primary for backward compatibility
    };

    let updatedCars: Car[];
    if (editingCar) {
      updatedCars = cars.map(car => car.id === editingCar.id ? newCar : car);
    } else {
      updatedCars = [...cars, newCar];
    }

    setCars(updatedCars);
    localStorage.setItem('inventoryCars', JSON.stringify(updatedCars));

    // Reset form
    setShowForm(false);
    setEditingCar(null);
    setUploadedImages([]);
    setFormData({
      title: '',
      year: new Date().getFullYear().toString(),
      yearCount: '',
      color: '',
      mileage: '',
      price: '',
      numericPrice: 0,
      brand: '',
      bodyStyle: '',
      image: '',
      images: [],
      priceSub: ''
    });
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    // If car has multiple images, use them; otherwise convert single image to array
    const carImages = car.images && car.images.length > 0 ? car.images : (car.image ? [car.image] : []);
    setUploadedImages(carImages);
    setFormData({
      title: car.title,
      year: car.year,
      yearCount: car.yearCount,
      color: car.color,
      mileage: car.mileage,
      price: car.price,
      numericPrice: car.numericPrice,
      brand: car.brand,
      bodyStyle: car.bodyStyle,
      image: car.image,
      images: car.images || [],
      priceSub: car.priceSub || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      const updatedCars = cars.filter(car => car.id !== id);
      setCars(updatedCars);
      localStorage.setItem('inventoryCars', JSON.stringify(updatedCars));
    }
  };

  const brands = ['Aston Martin', 'Lamborghini', 'Ferrari', 'McLaren', 'Porsche', 'Bugatti', 'Rolls Royce', 'Bentley'];
  const bodyStyles = ['Hypercar', 'Supercar', 'SUV', 'Sedan', 'Coupe', 'Convertible'];

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="bg-dark-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <CarIcon className="h-8 w-8 text-accent-red" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-dark-700 hover:bg-dark-600 px-4 py-2 rounded-md transition-colors"
            >
              <LogOutIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Inventory Management</h2>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingCar(null);
              setUploadedImages([]);
              setFormData({
                title: '',
                year: new Date().getFullYear().toString(),
                yearCount: '',
                color: '',
                mileage: '',
                price: '',
                numericPrice: 0,
                brand: '',
                bodyStyle: '',
                image: '',
                images: [],
                priceSub: ''
              });
            }}
            className="flex items-center space-x-2 bg-accent-red hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add New Car</span>
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-dark-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">
                    {editingCar ? 'Edit Car' : 'Add New Car'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingCar(null);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Title/Model
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-red"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Brand
                      </label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-red"
                        required
                      >
                        <option value="">Select Brand</option>
                        {brands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-red"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Year Count (e.g., "(23)")
                      </label>
                      <input
                        type="text"
                        name="yearCount"
                        value={formData.yearCount}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-red"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Color
                      </label>
                      <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-red"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Mileage
                      </label>
                      <input
                        type="text"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-red"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Price (e.g., "£199,950" or "POA")
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-red"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Price Subtitle (e.g., "inc. VAT")
                      </label>
                      <input
                        type="text"
                        name="priceSub"
                        value={formData.priceSub}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-red"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Body Style
                      </label>
                      <select
                        name="bodyStyle"
                        value={formData.bodyStyle}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-dark-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent-red"
                        required
                      >
                        <option value="">Select Body Style</option>
                        {bodyStyles.map(style => (
                          <option key={style} value={style}>{style}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Images (Drag & Drop or Click to Upload)
                      </label>
                      <ImageUpload
                        images={uploadedImages}
                        onImagesChange={setUploadedImages}
                        maxImages={10}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingCar(null);
                      }}
                      className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-accent-red hover:bg-red-700 rounded-md transition-colors"
                    >
                      {editingCar ? 'Update Car' : 'Add Car'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="bg-dark-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {cars.map(car => (
                  <tr key={car.id} className="hover:bg-dark-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={car.image}
                        alt={car.title}
                        className="h-16 w-24 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {car.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {car.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {car.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {car.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(car)}
                          className="text-blue-500 hover:text-blue-400 transition-colors"
                        >
                          <EditIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {cars.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No cars in inventory. Click "Add New Car" to get started.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;