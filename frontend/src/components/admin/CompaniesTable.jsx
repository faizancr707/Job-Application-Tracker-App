import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies
      ?.filter((company) => company && company.id) // Ensure valid and defined _id
      ?.filter((company) => {
        if (!searchCompanyByText) return true;
        return company.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });

    setFilterCompany(filteredCompany || []);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white rounded-lg shadow-md p-5 transition-all duration-300">
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.map((company) => (
            <TableRow key={company._id} className="hover:bg-blue-50">
              <TableCell>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={company.logo} alt={company.name} />
                  </Avatar>
                </motion.div>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.createdAt?.split('T')[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer transition-all duration-300"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
