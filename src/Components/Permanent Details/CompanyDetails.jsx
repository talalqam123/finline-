import { motion } from 'framer-motion';

const CompanyDetails = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <form className="space-y-6">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Company Name *
          </label>
          <input
            type="text"
            placeholder="M/s hello"
            className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Address of the Unit *
          </label>
          <input
            type="text"
            placeholder="13-A Civil Area Hs"
            className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Pin Code *
          </label>
          <input
            type="text"
            placeholder="265656"
            className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Your Activity *
          </label>
          <input
            type="text"
            placeholder="Desiccated Coconut Powder"
            className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Scheme *
          </label>
          <select className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
            <option value="">Select Scheme</option>
            <option value="mudra">Mudra</option>
            <option value="pmegp">PMEGP</option>
            <option value="sme">SME</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            placeholder="qamartalal76@gmail.com"
            className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <input
            type="tel"
            placeholder="3005274904"
            className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Number of Employment
          </label>
          <input
            type="number"
            placeholder="5"
            className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Purpose of this Report *
          </label>
          <select className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
            <option value="bank_loan">Bank Loan</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Firm Registration Type *
          </label>
          <select className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
            <option value="proprietorship">Proprietorship</option>
            <option value="partnership">Partnership</option>
            <option value="llp">LLP</option>
            <option value="pvt_ltd">Private Limited</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Sector *
          </label>
          <select className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
            <option value="manufacturing">Manufacturing</option>
            <option value="service">Service</option>
            <option value="trading">Trading</option>
          </select>
        </div>
      </form>
    </motion.div>
  );
};

export default CompanyDetails;
