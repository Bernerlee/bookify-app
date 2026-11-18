import {
  createService,
  getAllServices,
  getServiceById,
} from "../services/serviceService.js";

// Create a new service
export const createServiceController = async (req, res, next) => {
  try {
    const { name, description, price, duration } = req.body;

    // Validate required fields
    if (!name || price === undefined || duration === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and duration are required",
      });
    }

    // Validate price and duration
    if (
      !Number.isFinite(Number(price)) ||
      Number(price) <= 0 ||
      !Number.isInteger(Number(duration)) ||
      Number(duration) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Price and duration must be valid positive numbers",
      });
    }

    const service = await createService({
      name: name.trim(),
      description: description || null,
      price: Number(price),
      duration: Number(duration),
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    next(error);
  }
};

// Get all services
export const getAllServicesController = async (req, res, next) => {
  try {
    const services = await getAllServices();

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    next(error);
  }
};

// Get a service by ID
export const getServiceByIdController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const service = await getServiceById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    next(error);
  }
};
